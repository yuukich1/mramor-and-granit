"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";
import { getProductImageUrl, getProductPriceLabel } from "@/utils/prodView";

interface ProductCardProps {
    product: Product;
    categoryName: string;
    onSelect: (product: Product) => void;
}

export function ProductCard({
    product,
    categoryName,
    onSelect,
}: ProductCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="h-full"
        >

            <Card className="overflow-hidden h-full flex flex-row sm:flex-col bg-white border-neutral-200 group hover:shadow-2xl transition-all duration-500 max-w-[calc(100vw-2rem)] mx-auto">
                
                <div className="relative w-1/3 sm:w-full aspect-square sm:aspect-[3/4] bg-neutral-100 overflow-hidden flex-shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent z-10 hidden sm:block" />

                    <div className="absolute bottom-4 left-4 z-20 hidden sm:block">
                        <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl px-4 py-2 shadow-2xl">
                            <div className="text-white font-bold text-xl tracking-tight ">
                                {getProductPriceLabel(product)} 
                            </div>
                        </div>
                    </div>

                    <Image
                        src={getProductImageUrl(product)}
                        alt={product.name}
                        fill 
                        unoptimized
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                </div>


                <div className="flex flex-col flex-grow min-w-0 overflow-hidden">
                    <CardContent className="p-3 sm:p-6 flex-grow flex flex-col justify-center sm:justify-start">
                        <p className="text-[10px] sm:text-sm text-neutral-500 mb-0.5 sm:mb-1 truncate">
                            {categoryName}
                        </p>
                        
                        <h3 className="text-sm sm:text-2xl font-serif text-neutral-800 mb-1 sm:mb-2 leading-tight line-clamp-2 sm:whitespace-normal group-hover:text-amber-800 transition-colors">
                            {product.name}
                        </h3>

                        <div className="text-amber-900 font-bold text-sm sm:hidden mt-1">
                            {getProductPriceLabel(product)}
                        </div>
                    </CardContent>

                    <CardFooter className="p-4 sm:p-6 pt-0">
                        <Button
                            variant="outline"
                            onClick={() => onSelect(product)}
                            className="w-full h-9 sm:h-10 border-amber-700 text-amber-800 hover:bg-amber-50 group/btn z-10 text-xs sm:text-sm"
                        >
                            <span className="hidden sm:inline">Подробнее</span>
                            <span className="sm:hidden">Смотреть</span>
                            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                    </CardFooter>
                </div>
            </Card>
        </motion.div>
    );
}