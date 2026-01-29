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
        >
            <Card className="overflow-hidden h-full flex flex-col bg-white border-neutral-200 group hover:shadow-2xl transition-all duration-500">
                <div className="relative aspect-[3/4] bg-neutral-100 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />

                    <div className="absolute bottom-4 left-4 z-20">
                        <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl px-4 py-2 shadow-2xl">
                            <div className="text-white font-bold text-xl tracking-tight ">
                                {getProductPriceLabel(product)} 
                            </div>
                        </div>
                    </div>

                    <Image
                        src={getProductImageUrl(product)}
                        alt={product.name}
                        width={450}
                        height={400}
                        unoptimized
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                </div>

                <CardContent className="p-6 flex-grow">
                    <h3 className="text-2xl font-serif text-neutral-800 mb-2 drop-shadow-sm group-hover:text-amber-800 transition-colors">
                        {product.name}
                    </h3>

                    <p className="text-neutral-600 mb-1 drop-shadow-sm">
                        {categoryName}
                    </p>
                </CardContent>

                <CardFooter className="p-6 pt-0">
                    <Button
                        variant="outline"
                        onClick={() => onSelect(product)}
                        className="w-full border-amber-700 text-amber-800 hover:bg-amber-50 group/btn z-10"
                    >
                        Подробнее
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    );
}
