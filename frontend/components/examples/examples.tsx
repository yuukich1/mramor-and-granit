"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { GALLERY_ITEMS } from "./gallery-items";
import { useIsMobile } from "@/hooks/useIsMobile";
import { VKBlock } from "./vk";

export function Examples() {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const isMobile = useIsMobile();

    const currentIndex = GALLERY_ITEMS.findIndex(item => item.id === selectedId);

    const navigate = useCallback((direction: number) => {
        const nextIndex = (currentIndex + direction + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
        setSelectedId(GALLERY_ITEMS[nextIndex].id);
    }, [currentIndex]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedId === null) return;
            if (e.key === "ArrowLeft") navigate(-1);
            if (e.key === "ArrowRight") navigate(1);
            if (e.key === "Escape") setSelectedId(null);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedId, navigate]);

    useEffect(() => {
        document.body.style.overflow = selectedId !== null ? 'hidden' : 'auto';
        return () => { document.body.style.overflow = 'auto'; };
    }, [selectedId]);

    return (
        <section id="portfolio" className="py-12 md:py-24 bg-white relative overflow-hidden">

            <div className="max-w-7xl mx-auto px-4 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12 md:mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-serif text-neutral-900 mb-6">
                        Примеры наших работ
                    </h2>
                    <p className="text-neutral-600 max-w-2xl mx-auto text-lg">
                        Более 500 выполненных проектов. Каждая работа — это память, воплощенная в камне.
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                    {GALLERY_ITEMS.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => setSelectedId(item.id)}
                            className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer bg-neutral-100"
                        >
                            <Image
                                src={`/preview${item.id}.jpg`}
                                alt={item.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                sizes="(max-width: 768px) 50vw, 25vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                <p className="text-white font-serif text-lg">{item.title}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <VKBlock />
            </div>

            <AnimatePresence>
                {selectedId !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-neutral-950/98 backdrop-blur-xl flex flex-col"
                    >
                        <button
                            onClick={() => setSelectedId(null)}
                            className="absolute top-6 right-6 z-[110] p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                        >
                            <X className="w-6 h-6 text-white" />
                        </button>

                        <div className="flex-1 relative flex items-center justify-center p-4">
                            <motion.div
                                key={selectedId}
                                initial={{ opacity: 0, x: 20, scale: 0.9 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, x: -20, scale: 0.9 }}
                                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                className="relative w-full h-full max-w-5xl"
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                onDragEnd={(_, info) => {
                                    if (info.offset.x > 100) navigate(-1);
                                    else if (info.offset.x < -100) navigate(1);
                                }}
                            >
                                <Image
                                    src={`/preview${selectedId}.jpg`}
                                    alt="Gallery image"
                                    fill
                                    className="object-contain pointer-events-none"
                                    priority
                                />
                            </motion.div>

                            {!isMobile && (
                                <>
                                    <button
                                        onClick={() => navigate(-1)}
                                        className="absolute left-8 p-4 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all"
                                    >
                                        <ChevronLeft className="w-8 h-8" />
                                    </button>
                                    <button
                                        onClick={() => navigate(1)}
                                        className="absolute right-8 p-4 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all"
                                    >
                                        <ChevronRight className="w-8 h-8" />
                                    </button>
                                </>
                            )}
                        </div>

                        <div className="p-6 md:p-12 bg-gradient-to-t from-black/50 to-transparent">
                            <div className="max-w-3xl mx-auto text-center">
                                <motion.h3 
                                    key={`t-${selectedId}`}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-white text-2xl md:text-3xl font-serif mb-2"
                                >
                                    {GALLERY_ITEMS[currentIndex]?.title}
                                </motion.h3>
                                <motion.p 
                                    key={`d-${selectedId}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-neutral-400 text-base md:text-lg mb-6"
                                >
                                    {GALLERY_ITEMS[currentIndex]?.description}
                                </motion.p>
                                
                                <div className="flex justify-center gap-2 overflow-x-auto py-2">
                                    {GALLERY_ITEMS.map((item, idx) => (
                                        <button
                                            key={item.id}
                                            onClick={() => setSelectedId(item.id)}
                                            className={`h-1.5 rounded-full transition-all duration-300 ${
                                                selectedId === item.id ? 'w-8 bg-white' : 'w-2 bg-white/20'
                                            }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}