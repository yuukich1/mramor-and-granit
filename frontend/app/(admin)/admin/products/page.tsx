"use client";

import { useState, useRef, useMemo, useEffect } from "react";
import { Plus, Search, Edit2, Trash2, X, Loader2, Upload, Tag as TagIcon, Filter, XCircle, AlertTriangle, FileJson, FormInput } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import api from "@/api/axiosInstance";
import { useProducts } from "@/hooks/useProduct";
import { getProductImageUrl } from "@/utils/prodView";
import { useCategories } from "@/hooks/useCategories";
import Image from "next/image";


type FormItem = {
    id: string; 
    name: string;
    description: string;
    price: string;
    category_id: number;
    tags: string[];
    file: File | null;
    previewUrl: string | null;
};

const createEmptyItem = (): FormItem => ({
    id: Math.random().toString(36).substring(7),
    name: "",
    description: "",
    price: "",
    category_id: 0,
    tags: [],
    file: null,
    previewUrl: null
});

export default function ProductsPage() {
    const { allProducts, loading: productsLoading, refreshProducts } = useProducts({ apiLimit: 1000 });
    const { categories, loading: catsLoading } = useCategories();
    
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedTag, setSelectedTag] = useState("all");
    
    const [showProductModal, setShowProductModal] = useState(false);
    const [deleteModalId, setDeleteModalId] = useState<number | null>(null);
    const [errorAlert, setErrorAlert] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    

    const [isJsonMode, setIsJsonMode] = useState(false);
    const [jsonInput, setJsonInput] = useState("");
    
    const [editingProductId, setEditingProductId] = useState<number | null>(null);
    const [batchItems, setBatchItems] = useState<FormItem[]>([createEmptyItem()]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [tagInput, setTagInput] = useState("");

    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        return () => {
            batchItems.forEach(item => {
                if (item.previewUrl?.startsWith("blob:")) {
                    URL.revokeObjectURL(item.previewUrl);
                }
            });
        };
    }, []);

    const activeItem = batchItems[activeIndex];

    const updateActiveItem = (field: keyof FormItem, value: any) => {
        const newItems = [...batchItems];
        newItems[activeIndex] = { ...newItems[activeIndex], [field]: value };
        setBatchItems(newItems);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);

            const newItems = [...batchItems];
            newItems[activeIndex] = {
                ...newItems[activeIndex],
                file,
                previewUrl
            };

            setBatchItems(newItems);
        }
    };

    const allTags = useMemo(() => {
        const tags = new Set<string>();
        allProducts.forEach(product => product.tags?.forEach(tag => tags.add(tag)));
        return Array.from(tags).sort();
    }, [allProducts]);

    const suggestedTags = useMemo(() => {
        if (!tagInput.trim() || !activeItem) return [];
        return allTags.filter(t => 
            t.toLowerCase().includes(tagInput.toLowerCase()) && 
            !activeItem.tags.includes(t)
        ).slice(0, 5);
    }, [tagInput, allTags, activeItem]);

    const handleAddTag = (tagStr: string) => {
        const trimmed = tagStr.trim();
        if (!trimmed) return;
        const formattedTag = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
        
        if (!activeItem.tags.includes(formattedTag)) {
            updateActiveItem("tags", [...activeItem.tags, formattedTag]);
        }
        setTagInput("");
    };

    const removeTag = (tagToRemove: string) => {
        updateActiveItem("tags", activeItem.tags.filter(t => t !== tagToRemove));
    };

    const addBatchItem = () => {
        setBatchItems([...batchItems, createEmptyItem()]);
        setActiveIndex(batchItems.length);
        setTagInput("");
    };

    const removeBatchItem = (indexToRemove: number) => {
        if (batchItems.length === 1) return; 
        const newItems = batchItems.filter((_, idx) => idx !== indexToRemove);
        setBatchItems(newItems);
        if (activeIndex >= indexToRemove && activeIndex > 0) {
            setActiveIndex(activeIndex - 1);
        }
    };

    const confirmDelete = async () => {
        if (!deleteModalId) return;
        setIsSubmitting(true);
        try {
            await api.delete(`/products/${deleteModalId}`);
            await refreshProducts();
            setDeleteModalId(null);
        } catch (err) {
            console.error(err);
            setErrorAlert("Ошибка при удалении товара");
        } finally {
            setIsSubmitting(false);
        }
    };

    const openEditModal = (product: any) => {
        setEditingProductId(product.id);
        setIsJsonMode(false);
        setBatchItems([{
            id: product.id.toString(),
            name: product.name,
            description: product.description || "",
            price: product.price ? product.price.toString() : "",
            category_id: product.category_id,
            tags: product.tags || [],
            file: null,
            previewUrl: getProductImageUrl(product),
        }]);
        setActiveIndex(0);
        setShowProductModal(true);
    };

    const resetForm = () => {
        setBatchItems([createEmptyItem()]);
        setActiveIndex(0);
        setEditingProductId(null);
        setJsonInput("");
        setIsJsonMode(false);
        setTagInput("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            if (isJsonMode && !editingProductId) {
                let parsedItems: any[];
                try {
                    parsedItems = JSON.parse(jsonInput);
                    if (!Array.isArray(parsedItems)) throw new Error("Not array");
                } catch (err) {
                    setErrorAlert("Неверный формат JSON.");
                    setIsSubmitting(false);
                    return;
                }

                for (const item of parsedItems) {
                    if (!item.name || !item.category_id) {
                        setErrorAlert("У всех товаров должны быть name и category_id");
                        setIsSubmitting(false);
                        return;
                    }

                    await api.post("/products/", {
                        name: item.name,
                        description: item.description || "",
                        price: Number(item.price) || 0,
                        category_id: Number(item.category_id),
                        tags: item.tags || []
                    });
                }
            } else {
                const invalidItem = batchItems.find(item => item.category_id === 0 || !item.name.trim());
                if (invalidItem) {
                    setActiveIndex(batchItems.indexOf(invalidItem));
                    setErrorAlert("Заполните название и категорию для всех вкладок.");
                    setIsSubmitting(false);
                    return;
                }

                for (const item of batchItems) {
                    const payload = {
                        name: item.name,
                        description: item.description,
                        price: Number(item.price) || 0,
                        category_id: Number(item.category_id),
                        tags: item.tags
                    };

                    let currentProductId: number;

                    if (editingProductId) {
                        await api.put(`/products/${editingProductId}`, payload);
                        currentProductId = editingProductId;
                    } else {
                        const res = await api.post("/products/", payload);
                        currentProductId = res.data.id;
                    }

                    if (item.file && currentProductId) {
                        const imageFormData = new FormData();
                        imageFormData.append("file", item.file); 
                        
                        try {
                            await api.patch(`/products/image/${currentProductId}`, imageFormData, {
                                headers: { "Content-Type": "multipart/form-data" },
                            });
                        } catch (imgErr) {
                            console.error(`Ошибка загрузки фото для товара ${currentProductId}:`, imgErr);
                        }
                    }
                }
            }

            setShowProductModal(false);
            resetForm();
            await refreshProducts(); 
        } catch (err) {
            console.error("Ошибка при сохранении:", err);
            setErrorAlert("Произошла ошибка при сохранении. Проверьте консоль.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const filteredProducts = useMemo(() => {
        return allProducts.filter((product) => {
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === "all" || product.category_id.toString() === selectedCategory;
            const matchesTag = selectedTag === "all" || product.tags?.includes(selectedTag);
            return matchesSearch && matchesCategory && matchesTag;
        });
    }, [allProducts, searchQuery, selectedCategory, selectedTag]);

    return (
        <div className="max-w-7xl mx-auto space-y-6 p-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl shadow-sm border border-neutral-100">
                <div>
                    <h1 className="text-3xl font-bold text-neutral-900">Управление товарами</h1>
                    <p className="text-neutral-500 font-medium">Каталог и фильтры</p>
                </div>
                <button
                    onClick={() => {
                        resetForm();
                        setShowProductModal(true);
                    }}
                    className="flex items-center gap-2 px-6 py-3.5 bg-neutral-900 text-white rounded-2xl hover:bg-black transition-all shadow-lg active:scale-95"
                >
                    <Plus className="w-5 h-5" />
                    Добавить товары
                </button>
            </div>

            <div className="bg-white p-4 rounded-3xl shadow-sm border border-neutral-100 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-2 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                        <input
                            type="text"
                            placeholder="Поиск по названию..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-neutral-900 outline-none transition-all"
                        />
                    </div>

                    <div className="relative">
                        <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-2xl appearance-none focus:ring-2 focus:ring-neutral-900 outline-none cursor-pointer text-sm font-medium"
                        >
                            <option value="all">Все категории</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="relative">
                        <TagIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                        <select
                            value={selectedTag}
                            onChange={(e) => setSelectedTag(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-2xl appearance-none focus:ring-2 focus:ring-neutral-900 outline-none cursor-pointer text-sm font-medium"
                        >
                            <option value="all">Все теги</option>
                            {allTags.map((tag) => (
                                <option key={tag} value={tag}>{tag}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {(productsLoading || catsLoading) ? (
                <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-neutral-300" /></div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <AnimatePresence mode="popLayout">
                        {filteredProducts.map((product) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                key={product.id}
                                className="bg-white rounded-[2rem] border border-neutral-100 overflow-hidden hover:shadow-xl transition-all group"
                            >
                                <div className="relative h-56 bg-neutral-100">
                                    <Image fill src={getProductImageUrl(product)} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    <button onClick={() => setDeleteModalId(product.id)} className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-md text-red-500 rounded-xl opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="p-5 space-y-3">
                                    <div className="flex flex-wrap gap-1">
                                        {product.tags?.map((tag: string) => (
                                            <span key={`${product.id}-${tag}`} className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 bg-neutral-100 text-neutral-500 rounded-md">{tag}</span>
                                        ))}
                                    </div>
                                    <h3 className="font-bold text-neutral-800 line-clamp-1">{product.name}</h3>
                                    <div className="flex justify-between items-center">
                                        <span className={`text-lg font-black ${product.price ? 'text-neutral-900' : 'text-neutral-400 text-sm font-bold'}`}>
                                            {product.price && product.price > 0 ? `${product.price.toLocaleString()} ₽` : "Цена по запросу"}
                                        </span>
                                        <button onClick={() => openEditModal(product)} className="p-2 text-neutral-400 hover:text-neutral-900">
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}

            <AnimatePresence>
                {showProductModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => { setShowProductModal(false); resetForm(); }} className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm" />
                        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative bg-white rounded-[2.5rem] shadow-2xl max-w-2xl w-full p-6 md:p-8 overflow-y-auto max-h-[95vh] flex flex-col">
                            
                            <div className="flex justify-between items-center mb-6 shrink-0">
                                <div>
                                    <h2 className="text-2xl font-black text-neutral-900">
                                        {editingProductId ? "Редактировать товар" : "Добавление товаров"}
                                    </h2>
                                    {!editingProductId && (
                                        <p className="text-sm text-neutral-500 font-medium mt-1">
                                            Добавьте один или несколько товаров сразу
                                        </p>
                                    )}
                                </div>
                                <button onClick={() => { setShowProductModal(false); resetForm(); }} className="p-2 hover:bg-neutral-100 rounded-full shrink-0"><X /></button>
                            </div>

                            {!editingProductId && (
                                <div className="flex p-1 bg-neutral-100 rounded-2xl mb-6 shrink-0">
                                    <button
                                        onClick={() => setIsJsonMode(false)}
                                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm transition-all ${!isJsonMode ? 'bg-white shadow-sm text-neutral-900' : 'text-neutral-500 hover:text-neutral-700'}`}
                                    >
                                        <FormInput className="w-4 h-4" /> Вручную
                                    </button>
                                    <button
                                        onClick={() => setIsJsonMode(true)}
                                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm transition-all ${isJsonMode ? 'bg-white shadow-sm text-neutral-900' : 'text-neutral-500 hover:text-neutral-700'}`}
                                    >
                                        <FileJson className="w-4 h-4" /> JSON Импорт
                                    </button>
                                </div>
                            )}

                            {!editingProductId && !isJsonMode && (
                                <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-2 shrink-0 no-scrollbar border-b border-neutral-100">
                                    {batchItems.map((item, idx) => (
                                        <div key={item.id} className="relative group shrink-0">
                                            <button
                                                onClick={() => setActiveIndex(idx)}
                                                className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all border ${activeIndex === idx ? 'bg-neutral-900 text-white border-neutral-900' : 'bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50'}`}
                                            >
                                                Товар {idx + 1}
                                            </button>
                                            {batchItems.length > 1 && (
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); removeBatchItem(idx); }}
                                                    className="absolute -top-2 -right-2 bg-white border border-neutral-200 text-neutral-400 hover:text-red-500 rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                                                >
                                                    <XCircle className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    <button
                                        onClick={addBatchItem}
                                        className="shrink-0 flex items-center gap-1 px-4 py-2.5 rounded-xl font-bold text-sm bg-neutral-100 text-neutral-600 hover:bg-neutral-200 transition-all border border-transparent"
                                    >
                                        <Plus className="w-4 h-4" /> Добавить
                                    </button>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-5">
                                {isJsonMode && !editingProductId ? (
                                    <div className="space-y-4">
                                        <div className="bg-blue-50 text-blue-800 p-4 rounded-2xl text-sm">
                                            <p className="font-bold mb-1">Формат данных:</p>
                                            <code className="text-xs bg-white/50 px-2 py-1 rounded block mb-2">
                                                {`[ { "name": "...", "description": "...", "price": 0, "category_id": 1, "tags": ["tag1"] } ]`}
                                            </code>
                                            <p className="text-xs opacity-80">* Фотографии для импортированных товаров добавляются позже через редактирование.</p>
                                        </div>
                                        <textarea
                                            placeholder="Вставьте JSON массив сюда..."
                                            rows={10}
                                            value={jsonInput}
                                            onChange={(e) => setJsonInput(e.target.value)}
                                            className="w-full px-5 py-4 bg-neutral-50 border border-neutral-200 rounded-2xl outline-none resize-y focus:ring-2 focus:ring-black transition-all font-mono text-sm"
                                        />
                                    </div>
                                ) : (
                                    <>
                                        <div onClick={() => fileInputRef.current?.click()} className="relative h-40 rounded-3xl border-2 border-dashed border-neutral-200 bg-neutral-50 flex flex-col items-center justify-center cursor-pointer overflow-hidden group">
                                            {activeItem.previewUrl ? <Image src={activeItem.previewUrl} alt="Preview" className="w-full h-full object-cover" fill /> : (
                                                <div className="text-center group-hover:scale-105 transition-transform">
                                                    <Upload className="mx-auto text-neutral-400 mb-2 w-8 h-8" />
                                                    <span className="text-xs font-bold text-neutral-400 uppercase">Загрузить фото</span>
                                                </div>
                                            )}
                                            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                                        </div>

                                        <input
                                            required
                                            placeholder="Название продукта"
                                            value={activeItem.name}
                                            onChange={(e) => updateActiveItem("name", e.target.value)}
                                            className="w-full px-5 py-3.5 bg-neutral-50 border border-neutral-200 rounded-2xl outline-none focus:ring-2 focus:ring-black transition-all"
                                        />

                                        <div className="grid grid-cols-2 gap-4">
                                            <input
                                                type="number"
                                                min="0"
                                                placeholder="Цена (₽) — по умолчанию 0"
                                                value={activeItem.price}
                                                onChange={(e) => updateActiveItem("price", e.target.value)}
                                                className="w-full px-5 py-3.5 bg-neutral-50 border border-neutral-200 rounded-2xl outline-none focus:ring-2 focus:ring-black transition-all"
                                            />
                                            <select
                                                required
                                                value={activeItem.category_id}
                                                onChange={(e) => updateActiveItem("category_id", Number(e.target.value))}
                                                className="w-full px-5 py-3.5 bg-neutral-50 border border-neutral-200 rounded-2xl outline-none cursor-pointer"
                                            >
                                                <option value={0}>Категория</option>
                                                {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                                            </select>
                                        </div>

                                        <div className="space-y-3 relative">
                                            <label className="text-xs font-black uppercase text-neutral-400 ml-1">Теги</label>
                                            <div className="flex flex-wrap gap-2 p-2 bg-neutral-50 border border-neutral-200 rounded-2xl min-h-[56px] focus-within:ring-2 focus-within:ring-black transition-all">
                                                {activeItem.tags.map(tag => (
                                                    <span key={tag} className="flex items-center gap-1 px-3 py-1 bg-white border border-neutral-200 rounded-full text-sm font-bold text-neutral-700 shadow-sm">
                                                        {tag}
                                                        <button type="button" onClick={() => removeTag(tag)}>
                                                            <XCircle className="w-4 h-4 text-neutral-300 hover:text-red-500 transition-colors" />
                                                        </button>
                                                    </span>
                                                ))}
                                                <input
                                                    type="text"
                                                    value={tagInput}
                                                    onChange={(e) => setTagInput(e.target.value)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter" || e.key === ",") {
                                                            e.preventDefault();
                                                            handleAddTag(tagInput);
                                                        }
                                                    }}
                                                    placeholder={activeItem.tags.length === 0 ? "Добавить тег..." : ""}
                                                    className="flex-1 min-w-[120px] bg-transparent outline-none px-2 text-sm font-medium"
                                                />
                                            </div>

                                            <AnimatePresence>
                                                {suggestedTags.length > 0 && (
                                                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                                                        className="absolute z-10 w-full bg-white border border-neutral-100 shadow-xl rounded-2xl mt-1 overflow-hidden"
                                                    >
                                                        {suggestedTags.map(tag => (
                                                            <button key={tag} type="button" onClick={() => handleAddTag(tag)} className="w-full text-left px-4 py-2 text-sm hover:bg-neutral-50 font-medium text-neutral-600 transition-colors">
                                                                {tag}
                                                            </button>
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>

                                        <textarea
                                            placeholder="Описание"
                                            rows={3}
                                            value={activeItem.description}
                                            onChange={(e) => updateActiveItem("description", e.target.value)}
                                            className="w-full px-5 py-3.5 bg-neutral-50 border border-neutral-200 rounded-2xl outline-none resize-none focus:ring-2 focus:ring-black transition-all"
                                        />
                                    </>
                                )}

                                <div className="pt-4 mt-auto">
                                    <button
                                        disabled={isSubmitting || (isJsonMode && !jsonInput.trim())}
                                        type="submit"
                                        className="w-full py-4 bg-neutral-900 text-white rounded-2xl font-bold text-lg hover:bg-black transition-all disabled:opacity-50"
                                    >
                                        {isSubmitting ? <Loader2 className="animate-spin mx-auto w-6 h-6" /> : (
                                            editingProductId ? "Сохранить изменения" :
                                            isJsonMode ? "Импортировать JSON" :
                                            batchItems.length > 1 ? `Создать ${batchItems.length} товаров` : "Создать продукт"
                                        )}
                                    </button>
                                </div>
                            </form>

                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {deleteModalId && (
                    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDeleteModalId(null)} className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm" />
                        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative bg-white rounded-3xl shadow-2xl max-w-sm w-full p-6 text-center">
                            <div className="mx-auto w-12 h-12 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-4"><Trash2 className="w-6 h-6" /></div>
                            <h3 className="text-xl font-bold text-neutral-900 mb-2">Удалить товар?</h3>
                            <p className="text-neutral-500 text-sm mb-6">Это действие нельзя будет отменить. Вы уверены?</p>
                            <div className="flex gap-3">
                                <button onClick={() => setDeleteModalId(null)} className="flex-1 py-3 bg-neutral-100 text-neutral-700 font-bold rounded-xl hover:bg-neutral-200 transition-colors">Отмена</button>
                                <button onClick={confirmDelete} disabled={isSubmitting} className="flex-1 py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-colors flex items-center justify-center">
                                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Удалить"}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {errorAlert && (
                    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setErrorAlert(null)} className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm" />
                        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative bg-white rounded-3xl shadow-2xl max-w-sm w-full p-6 text-center">
                            <div className="mx-auto w-12 h-12 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mb-4"><AlertTriangle className="w-6 h-6" /></div>
                            <h3 className="text-xl font-bold text-neutral-900 mb-2">Внимание</h3>
                            <p className="text-neutral-500 text-sm mb-6">{errorAlert}</p>
                            <button onClick={() => setErrorAlert(null)} className="w-full py-3 bg-neutral-900 text-white font-bold rounded-xl hover:bg-black transition-colors">Понятно</button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}