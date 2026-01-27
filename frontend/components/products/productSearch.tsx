"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";

interface ProductSearchProps {
    value: string;
    onChange: (value: string) => void;
}

export function ProductSearch({
    value,
    onChange,
}: ProductSearchProps) {
    return (
        <div className="relative max-w-7xl mx-auto mb-16">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="relative group"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-transparent rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                
                <div className="relative bg-white/80 backdrop-blur-sm border border-amber-200/50 rounded-2xl shadow-lg shadow-amber-100/50 group-hover:shadow-xl group-hover:shadow-amber-200/30 transition-all duration-300 group-focus-within:bg-white group-focus-within:border-amber-400/70 group-focus-within:shadow-amber-200/40">
                    <motion.div
                        animate={{ rotate: value ? 90 : 0 }}
                        transition={{ type: "spring", stiffness: 200 }}
                        className="absolute left-5 top-1/2 -translate-y-1/2"
                    >
                        <Search className="w-5 h-5 text-amber-500 group-focus-within:text-amber-600" />
                    </motion.div>

                    <input
                        value={value}
                        onChange={e => onChange(e.target.value)}
                        placeholder="Поиск"
                        className="w-full pl-14 pr-14 py-5 bg-transparent text-neutral-800 placeholder:text-neutral-500 focus:outline-none text-lg rounded-2xl"
                    />

                    <AnimatePresence>
                        {value && (
                            <motion.button
                                key="clear"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                onClick={() => onChange("")}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-amber-50 hover:bg-amber-100 active:scale-95"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <X className="w-4 h-4 text-amber-600" />
                            </motion.button>
                        )}
                    </AnimatePresence>
                </div>

                {value && (
                    <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-sm text-neutral-500"
                    >
                        <span className="bg-white/80 px-3 py-1 rounded-full">
                            Найдено совпадений
                        </span>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
}
