"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, Check, Phone  } from "lucide-react";
import { getProductImageUrl, getProductPriceLabel } from "@/utils/prodView";

import { Button } from "@/components/ui/button";
import { Product } from "@/hooks/useProduct";

interface ProductModalProps {
    product: Product | null;
    categoryName?: string;
    onClose: () => void;
}

export function ProductModal({
    product,
    categoryName,
    onClose,
}: ProductModalProps) {
    return (
        <AnimatePresence>
            {product && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 overflow-y-auto"
                >
                    <div className="min-h-screen flex items-start justify-center p-4 lg:p-8">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/80 backdrop-blur-xl"
                            onClick={onClose}
                        />

                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            transition={{ type: "spring", damping: 25 }}
                            className="relative w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden my-8"
                        >
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 transition-all duration-300"
                            >
                                <X className="w-5 h-5 text-white" />
                            </button>

                            <div className="relative h-64 lg:h-80 bg-gradient-to-r from-amber-900/90 to-amber-800/90">
                                <div className="absolute inset-0 overflow-hidden">
                                    <Image
                                        src={getProductImageUrl(product)}
                                        alt={product.name}
                                        fill
                                        className="object-cover opacity-40"
                                        priority
                                    />
                                </div>
                                <div className="relative h-full flex items-center px-8 lg:px-12">
                                    <div className="max-w-2xl">
                                        <div className="inline-flex items-center gap-2 text-amber-200 text-sm font-medium mb-3">
                                            {categoryName && (
                                                <>
                                                    <span>{categoryName}</span>
                                                </>
                                            )}
                                        </div>
                                        <h2 className="text-3xl lg:text-4xl font-serif text-white mb-3">
                                            {product.name}
                                        </h2>
                                        <div className="text-4xl lg:text-5xl font-serif text-white font-bold">
                                            {getProductPriceLabel(product)} 
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 lg:p-8">
                                <div className="grid lg:grid-cols-3 gap-8">
                                    <div className="lg:col-span-2 space-y-8">
                                        <div className="space-y-4">
                                            <h3 className="text-xl font-serif text-neutral-800">
                                                Описание изделия
                                            </h3>
                                            <div className="prose prose-lg max-w-none text-neutral-600">
                                                {product.description.split('\n').map((paragraph, idx) => (
                                                    <p key={idx} className="leading-relaxed">
                                                        {paragraph}
                                                    </p>
                                                ))}
                                            </div>
                                        </div>

                                        {product.tags?.length > 0 && (
                                            <div className="space-y-4">
                                                <h3 className="text-xl font-serif text-neutral-800">
                                                    Особенности и преимущества
                                                </h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    {product.tags.map((tag, idx) => (
                                                        <div
                                                            key={idx}
                                                            className="flex items-center gap-3 p-3 rounded-lg bg-amber-50/50 border border-amber-100"
                                                        >
                                                            <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center">
                                                                <Check className="w-3 h-3 text-amber-700" />
                                                            </div>
                                                            <span className="text-neutral-700">{tag}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        <div className="bg-gradient-to-r from-amber-50 to-transparent p-6 rounded-xl border border-amber-100">
                                            <h4 className="text-lg font-serif text-neutral-800 mb-3">
                                                Детали заказа
                                            </h4>
                                            <ul className="space-y-2 text-neutral-600">
                                                <li className="flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                                                    Изготовление от 3 до 7 рабочих дней
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                                                    Доставка по всей России
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                                                    Гарантия качества материалов
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="lg:col-span-1">
                                        <div className="sticky top-8 space-y-6">
                                            <div className="bg-neutral-50 rounded-xl p-6 border border-neutral-200">
                                                <h4 className="text-lg font-serif text-neutral-800 mb-4">
                                                    Оформить заказ
                                                </h4>
                                                <div className="space-y-4">
                                                    <Button className="w-full h-12 bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 shadow-lg"
                                                        onClick={onClose}
                                                    >
                                                        <a href="#contact" className="flex items-center justify-center w-full h-full">
                                                            <Phone className="w-4 h-4 mr-2" />
                                                            Оставить заявку для заказа
                                                        </a>
                                                    </Button>
                                                    {/* <Button
                                                        variant="outline"
                                                        className="w-full h-12 border-amber-700 text-amber-800 hover:bg-amber-50"
                                                    >
                                                        <MessageSquare className="w-4 h-4 mr-2" />
                                                        Написать в WhatsApp
                                                    </Button> */}
                                                </div>

                                                <div className="mt-6 pt-6 border-t border-neutral-300">
                                                    <div className="text-center">
                                                        <div className="text-3xl font-serif text-amber-900 mb-2">
                                                             {getProductPriceLabel(product)}
                                                        </div>
                                                        <div className="text-sm text-neutral-500">
                                                            окончательная стоимость может меняться в зависимости от сложности работы
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* <div className="bg-gradient-to-br from-amber-900 to-amber-800 rounded-xl p-6 text-white">
                                                <h4 className="text-lg font-serif mb-3">
                                                    Специальное предложение
                                                </h4>
                                                <p className="text-amber-100 text-sm mb-4">
                                                    При заказе двух изделий — скидка 15% на второе
                                                </p>
                                                <Button
                                                    variant="ghost"
                                                    className="w-full h-10 bg-white/10 hover:bg-white/20 text-white"
                                                >
                                                    Подробнее об акции
                                                </Button>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}