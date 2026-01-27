"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

import { useCategories } from "@/hooks/useCategories";
import { useProducts } from "@/hooks/useProduct";

import { mapCategoriesById } from "@/utils/mapCategories";
import { buildSearchIndex } from "@/utils/searchIndex";
import { searchIndexedProducts } from "@/utils/searchProducts";
import { filterProducts } from "@/utils/filterProducts";

import { Button } from "@/components/ui/button";
import { ProductsGrid } from "./productGrid";
import { ProductsSkeleton } from "./skeleton/productSkeleton";
import { ProductSearch } from "./productSearch";
import { ProductFilters } from "./productFilters";
import { ProductModal } from "./productModal";

import { Product } from "@/types/product";
import type { ProductFiltersState } from "@/types/filters";

export function ProductsSection() {
    const { allProducts, displayProducts, loadMore, hasMore, loading, loadingAll } = 
        useProducts({ limit: 6, loadAllForFiltering: true });
    const { categories } = useCategories();

    const categoriesMap = mapCategoriesById(categories);
    const isInitialLoading = loading && displayProducts.length === 0;

    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [query, setQuery] = useState("");

    const [filters, setFilters] = useState<ProductFiltersState>({
        minPrice: undefined,
        maxPrice: undefined,
        categoryId: undefined,
        tags: [],
    });

    const allTags = useMemo(() => {
        const set = new Set<string>();
        allProducts.forEach(product => {
            product.tags?.forEach(tag => set.add(tag));
        });
        return Array.from(set);
    }, [allProducts]);

    const indexedProducts = useMemo(() => {
        return buildSearchIndex(allProducts);
    }, [allProducts]);

    const searchedProducts = useMemo(() => {
        return searchIndexedProducts(indexedProducts, query);
    }, [indexedProducts, query]);

    const filteredAllProducts = useMemo(() => {
        return filterProducts(searchedProducts, filters);
    }, [searchedProducts, filters]);

    const visibleProducts = useMemo(() => {
        if (query || filters.tags.length > 0 || filters.categoryId || 
            filters.minPrice !== undefined || filters.maxPrice !== undefined) {
            return filteredAllProducts.slice(0, displayProducts.length);
        }
        return displayProducts;
    }, [filteredAllProducts, displayProducts, query, filters]);

    const hasActiveFilters = 
        filters.tags.length > 0 || 
        filters.categoryId || 
        filters.minPrice !== undefined || 
        filters.maxPrice !== undefined;

    const showLoadMore = 
        hasMore && 
        !isInitialLoading && 
        !query && 
        !hasActiveFilters;

    return (
        <section
            className="py-20 bg-white relative overflow-hidden"
            id="catalog"
        >
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

                <ProductSearch value={query} onChange={setQuery} />

                <ProductFilters
                    filters={filters}
                    categories={categories}
                    allTags={allTags}
                    onChange={setFilters}
                />

                {loadingAll ? (
                    <ProductsSkeleton />
                ) : (
                    <>
                        {visibleProducts.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-lg text-neutral-600">
                                    Ничего не найдено
                                </p>
                            </div>
                        ) : (
                            <>
                                <ProductsGrid
                                    products={visibleProducts}
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
                    </>
                )}

                {showLoadMore && (
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