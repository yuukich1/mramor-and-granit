"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { useCategories } from "@/hooks/useCategories";
import { useProducts } from "@/hooks/useProduct";
import { mapCategoriesById } from "@/utils/mapCategories";

import { Button } from "@/components/ui/button";
import { ProductsGrid } from "./productGrid";
import { ProductsSkeleton } from "./skeleton/productSkeleton";

import { Product } from "@/types/product";
import { ProductModal } from "./productModal";

export function ProductsSection() {
    const { products, loadMore, hasMore, loading } = useProducts(6);
    const { categories } = useCategories();

    const categoriesMap = mapCategoriesById(categories);
    const isInitialLoading = loading && products.length === 0;

    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    return (
        <section className="py-20 bg-white relative overflow-hidden"
        id="catalog">
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-gradient-to-r from-amber-100/30 to-transparent rounded-full blur-3xl -translate-y-1/2" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl lg:text-4xl font-serif text-neutral-800 mb-4 drop-shadow-sm">
                        Каталог памятников
                    </h2>
                    <p className="text-lg text-neutral-600 max-w-2xl mx-auto drop-shadow-sm">
                        Широкий выбор мемориальных памятников из натурального камня.
                        Возможность создания индивидуального проекта.
                    </p>
                </motion.div>

                {isInitialLoading ? (
                    <ProductsSkeleton />
                ) : (
                    <>
                        <ProductsGrid
                            products={products}
                            categoriesMap={categoriesMap}
                            onSelect={setSelectedProduct}
                        />

                        {loading && (
                            <div className="mt-8">
                                <ProductsSkeleton count={3} />
                            </div>
                        )}
                    </>
                )}

                {hasMore && !isInitialLoading && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mt-12"
                    >
                        <Button
                            size="lg"
                            onClick={loadMore}
                            disabled={loading}
                            className="bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            {loading ? "Загрузка..." : "Показать еще"}
                        </Button>
                    </motion.div>
                )}
            </div>

            <ProductModal
                product={selectedProduct}
                categoryName={
                    selectedProduct
                        ? categoriesMap[selectedProduct.category_id]
                        : undefined
                }
                onClose={() => setSelectedProduct(null)}
            />
        </section>
    );
}
