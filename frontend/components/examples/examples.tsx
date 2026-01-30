"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { GALLERY_ITEMS } from "./gallery-items";
import { useIsMobile } from "@/hooks/useIsMobile";

export function Examples() {
    const [selectedImage, setSelectedImage] = useState<number | null>(null);
    const isMobile = useIsMobile();

    const handlePrevious = () => {
        if (selectedImage === null) return;
        const currentIndex = GALLERY_ITEMS.findIndex(item => item.id === selectedImage);
        const previousIndex = currentIndex === 0 ? GALLERY_ITEMS.length - 1 : currentIndex - 1;
        setSelectedImage(GALLERY_ITEMS[previousIndex].id);
    };

    const handleNext = () => {
        if (selectedImage === null) return;
        const currentIndex = GALLERY_ITEMS.findIndex(item => item.id === selectedImage);
        const nextIndex = currentIndex === GALLERY_ITEMS.length - 1 ? 0 : currentIndex + 1;
        setSelectedImage(GALLERY_ITEMS[nextIndex].id);
    };

    return (
        <section
            id="portfolio"
            className="py-20 bg-gradient-to-b from-white via-neutral-50 to-white relative overflow-hidden"
        >
            <div className="absolute top-1/3 right-0 w-96 h-96 rounded-full blur-3xl bg-gradient-to-l from-amber-100/30 to-transparent" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl lg:text-4xl font-serif text-neutral-800 mb-4 drop-shadow-md">
                        Примеры наших работ
                    </h2>
                    <p className="text-lg text-neutral-600 max-w-2xl mx-auto drop-shadow-sm">
                        Более 500 выполненных проектов. Каждая работа — это память, воплощенная в камне
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {GALLERY_ITEMS.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="cursor-pointer group relative"
                            onClick={() => setSelectedImage(item.id)}
                        >
                            <div className="aspect-[3/4] rounded-xl overflow-hidden shadow-lg relative">
                                <Image
                                    src={`/preview${item.id}.jpg`}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 1024px) 100vw, 25vw"
                                />
                                <div className="absolute bottom-0 left-0 right-0 p-4 z-10 text-white bg-gradient-to-t from-black/100 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <h3 className="font-serif text-lg mb-1 drop-shadow-md">{item.title}</h3>
                                    {/*<p className="text-sm text-neutral-200 drop-shadow-sm">{item.description}</p>*/}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {selectedImage !== null && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/95 backdrop-blur-lg z-50 p-0 sm:p-4"
                >
                    <div className="h-full flex flex-col">
                        <div className="flex-1 flex flex-col lg:flex-row">
                            {!isMobile ? (
                                <div className="lg:w-1/2 flex items-center justify-center p-4">
                                    <motion.div
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 0.1 }}
                                        className="relative w-full h-[60vh] lg:h-[80vh] rounded-2xl overflow-hidden shadow-2xl"
                                    >
                                        <Image
                                            src={`/preview${selectedImage}.jpg`}
                                            alt={GALLERY_ITEMS.find(item => item.id === selectedImage)?.title || ""}
                                            fill
                                            className="object-contain"
                                            priority
                                            sizes="(max-width: 1024px) 100vw, 50vw"
                                        />
                                    </motion.div>
                                </div>
                            ) : (
                                <div className="flex-1 flex items-center justify-center p-4">
                                    <motion.div
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 0.1 }}
                                        className="relative w-full h-[50vh] rounded-xl overflow-hidden"
                                    >
                                        <Image
                                            src={`/preview${selectedImage}.jpg`}
                                            alt={GALLERY_ITEMS.find(item => item.id === selectedImage)?.title || ""}
                                            fill
                                            className="object-contain"
                                            priority
                                            sizes="100vw"
                                        />
                                    </motion.div>
                                </div>
                            )}

                            <div className={`${isMobile ? 'w-full' : 'lg:w-1/2'} flex flex-col ${isMobile ? 'p-4' : 'p-4 lg:p-8'} text-white`}>
                                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                                    <div className="flex-1">
                                        <motion.h3
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 }}
                                            className="text-2xl lg:text-3xl font-serif mb-3"
                                        >
                                            {GALLERY_ITEMS.find(item => item.id === selectedImage)?.title}
                                        </motion.h3>
                                        <motion.p
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 }}
                                            className="text-base lg:text-lg text-neutral-300"
                                        >
                                            {GALLERY_ITEMS.find(item => item.id === selectedImage)?.description}
                                        </motion.p>
                                    </div>

                                    <button
                                        onClick={() => setSelectedImage(null)}
                                        className={`${isMobile ? 'absolute top-4 right-4' : ''} w-10 h-10 sm:w-12 sm:h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0`}
                                    >
                                        <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                    </button>
                                </div>

                                {!isMobile && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.4 }}
                                        className="mt-8"
                                    >
                                        <div className="flex items-center gap-4">
                                            <button
                                                onClick={handlePrevious}
                                                className="w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-300"
                                            >
                                                <ChevronLeft className="w-6 h-6 text-white" />
                                            </button>
                                            <button
                                                onClick={handleNext}
                                                className="w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-300"
                                            >
                                                <ChevronRight className="w-6 h-6 text-white" />
                                            </button>
                                            <span className="text-neutral-400">
                                                {GALLERY_ITEMS.findIndex(item => item.id === selectedImage) + 1} / {GALLERY_ITEMS.length}
                                            </span>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </div>

                        {isMobile && (
                            <div className="border-t border-white/20 mt-4 pt-4">
                                <div className="flex items-center justify-between px-4">
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={handlePrevious}
                                            className="w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center"
                                        >
                                            <ChevronLeft className="w-5 h-5 text-white" />
                                        </button>
                                        <span className="text-white text-sm">
                                            {GALLERY_ITEMS.findIndex(item => item.id === selectedImage) + 1} / {GALLERY_ITEMS.length}
                                        </span>
                                        <button
                                            onClick={handleNext}
                                            className="w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center"
                                        >
                                            <ChevronRight className="w-5 h-5 text-white" />
                                        </button>
                                    </div>

                                    <div className="flex gap-1.5">
                                        {GALLERY_ITEMS.slice(0, 8).map((item) => (
                                            <button
                                                key={item.id}
                                                onClick={() => setSelectedImage(item.id)}
                                                className={`w-2 h-2 rounded-full transition-all ${selectedImage === item.id ? 'bg-white scale-110' : 'bg-white/30'}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {!isMobile && (
                            <div className="px-8 pb-4">
                                <div className="flex justify-center gap-1.5">
                                    {GALLERY_ITEMS.slice(0, 8).map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => setSelectedImage(item.id)}
                                            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${selectedImage === item.id ? 'bg-white scale-125' : 'bg-white/30 hover:bg-white/50'}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </section>
    );
}