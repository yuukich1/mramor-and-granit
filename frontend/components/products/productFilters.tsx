"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Filter, Tag, X, ChevronDown, Check } from "lucide-react";
import { useState } from "react";

import type { ProductFiltersState } from "@/types/filters";
import { Category } from "@/types/category";

interface ProductFiltersProps {
    filters: ProductFiltersState;
    categories: Category[];
    allTags: string[];
    onChange: (filters: ProductFiltersState) => void;
}

export function ProductFilters({
    filters,
    categories,
    allTags,
    onChange,
}: ProductFiltersProps) {
    const [isTagsOpen, setIsTagsOpen] = useState(false);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);

    const clearAll = () => {
        onChange({ categoryId: undefined, minPrice: undefined, maxPrice: undefined, tags: [] });
    };

    const clearCategory = () => {
        onChange({ ...filters, categoryId: undefined });
    };

    const clearTags = () => {
        onChange({ ...filters, tags: [] });
    };

    const removeTag = (tagToRemove: string) => {
        onChange({
            ...filters,
            tags: filters.tags.filter(tag => tag !== tagToRemove)
        });
    };

    const hasActiveFilters =
        filters.categoryId !== undefined ||
        filters.minPrice !== undefined ||
        filters.maxPrice !== undefined ||
        filters.tags.length > 0;

    const selectedCategory = filters.categoryId ? categories.find(c => c.id === filters.categoryId) : null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-16"
        >
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg">
                        <Filter className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-serif text-neutral-800">Фильтры</h3>
                        <p className="text-sm text-neutral-500">Уточните параметры поиска</p>
                    </div>
                </div>

                {hasActiveFilters && (
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={clearAll}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 transition-all shadow-md"
                    >
                        <X className="w-4 h-4" />
                        Сбросить все
                    </motion.button>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="relative bg-gradient-to-br from-white to-amber-50 rounded-2xl border border-amber-100 p-5 shadow-sm"
                >
                    <label className="block text-sm font-semibold text-amber-700 mb-3">Диапазон цен</label>
                    <div className="flex gap-3">
                        <div className="relative flex-1">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">₽</span>
                            <input
                                type="number"
                                placeholder="От"
                                className="w-full pl-8 pr-4 py-3 rounded-xl border border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all bg-white"
                                value={filters.minPrice ?? ""}
                                onChange={e =>
                                    onChange({ ...filters, minPrice: e.target.value ? Number(e.target.value) : undefined })
                                }
                            />
                        </div>
                        <div className="relative flex-1">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">₽</span>
                            <input
                                type="number"
                                placeholder="До"
                                className="w-full pl-8 pr-4 py-3 rounded-xl border border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all bg-white"
                                value={filters.maxPrice ?? ""}
                                onChange={e =>
                                    onChange({ ...filters, maxPrice: e.target.value ? Number(e.target.value) : undefined })
                                }
                            />
                        </div>
                    </div>
                </motion.div>

                <div className="relative">
                    <motion.div
                        whileHover={{ scale: 1.01 }}
                        className="bg-gradient-to-br from-white to-amber-50 rounded-2xl border border-amber-100 p-5 shadow-sm"
                    >
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-sm font-semibold text-amber-700">Категория</span>
                            {selectedCategory && (
                                <button
                                    onClick={clearCategory}
                                    className="text-xs text-amber-600 hover:text-amber-700 font-medium"
                                >
                                    Сбросить
                                </button>
                            )}
                        </div>
                        
                        <button
                            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                            className="w-full"
                        >
                            {selectedCategory ? (
                                <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-200">
                                    <span className="font-medium text-amber-700">
                                        {selectedCategory.name}
                                    </span>
                                    <Check className="w-5 h-5 text-amber-600" />
                                </div>
                            ) : (
                                <div className="flex justify-between items-center p-3 rounded-lg border border-amber-200 hover:border-amber-300 transition-colors">
                                    <span className="text-neutral-600">Выберите категорию</span>
                                    <ChevronDown
                                        className={`w-4 h-4 text-amber-600 transition-transform ${isCategoryOpen ? "rotate-180" : ""}`}
                                    />
                                </div>
                            )}
                        </button>
                    </motion.div>

                    <AnimatePresence>
                        {isCategoryOpen && !selectedCategory && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute z-15 w-full mt-2 bg-white rounded-xl border border-amber-100 shadow-lg overflow-hidden"
                            >
                                <div className="max-h-60 overflow-y-auto">
                                    {categories.map(cat => (
                                        <button
                                            key={cat.id}
                                            onClick={() => {
                                                onChange({ ...filters, categoryId: cat.id });
                                                setIsCategoryOpen(false);
                                            }}
                                            className="w-full text-left px-4 py-3 hover:bg-amber-50 text-neutral-700 transition-colors border-b border-amber-50 last:border-b-0"
                                        >
                                            {cat.name}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="relative">
                    <motion.div
                        whileHover={{ scale: 1.01 }}
                        className="bg-gradient-to-br from-white to-amber-50 rounded-2xl border border-amber-100 p-5 shadow-sm"
                    >
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-sm font-semibold text-amber-700">Теги</span>
                            {filters.tags.length > 0 && (
                                <button
                                    onClick={clearTags}
                                    className="text-xs text-amber-600 hover:text-amber-700 font-medium"
                                >
                                    Сбросить все
                                </button>
                            )}
                        </div>
                        
                        <button
                            onClick={() => setIsTagsOpen(!isTagsOpen)}
                            className="w-full mb-3"
                        >
                            <div className="flex justify-between items-center p-3 rounded-lg border border-amber-200 hover:border-amber-300 transition-colors">
                                <span className="text-neutral-600">
                                    {filters.tags.length > 0 
                                        ? `Выбрано тегов: ${filters.tags.length}` 
                                        : "Выберите теги"}
                                </span>
                                <ChevronDown
                                    className={`w-4 h-4 text-amber-600 transition-transform ${isTagsOpen ? "rotate-180" : ""}`}
                                />
                            </div>
                        </button>

                        {filters.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {filters.tags.map(tag => (
                                    <div
                                        key={tag}
                                        className="group relative px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full text-sm font-medium pr-7"
                                    >
                                        {tag}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                removeTag(tag);
                                            }}
                                            className="absolute right-1.5 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </motion.div>

                    <AnimatePresence>
                        {isTagsOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute z-15 w-full mt-2 bg-white rounded-xl border border-amber-100 shadow-lg overflow-hidden"
                            >
                                <div className="p-4 max-h-60 overflow-y-auto">
                                    <div className="flex flex-wrap gap-2">
                                        {allTags.map(tag => {
                                            const active = filters.tags.includes(tag);
                                            return (
                                                <button
                                                    key={tag}
                                                    onClick={() => {
                                                        onChange({
                                                            ...filters,
                                                            tags: active
                                                                ? filters.tags.filter(t => t !== tag)
                                                                : [...filters.tags, tag],
                                                        });
                                                    }}
                                                    className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all duration-300 ${
                                                        active
                                                            ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white border-transparent"
                                                            : "bg-white text-neutral-700 border-amber-200 hover:bg-amber-50"
                                                    }`}
                                                >
                                                    {tag}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
}