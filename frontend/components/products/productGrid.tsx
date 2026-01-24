"use client";

import { Product } from "@/types/product";
import { ProductCard } from "./productCard";


interface ProductsGridProps {
    products: Product[];
    categoriesMap: Record<number, string>;
    onSelect: (product: Product) => void;
}

export function ProductsGrid({
    products,
    categoriesMap,
    onSelect,
}: ProductsGridProps)
 {
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(product => (
                <ProductCard
                    key={product.id}
                    product={product}
                    categoryName={categoriesMap[product.category_id] ?? "—"}
                    onSelect={onSelect}
                />
            ))}
        </div>
    );
}
