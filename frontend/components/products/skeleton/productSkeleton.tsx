"use client";

import { ProductSkeletonCard } from "./productSkeletonCard";

interface ProductsSkeletonProps {
    count?: number;
}

export function ProductsSkeleton({ count = 6 }: ProductsSkeletonProps) {
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: count }).map((_, idx) => (
                <ProductSkeletonCard key={idx} />
            ))}
        </div>
    );
}
