"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    category_id: number;
    image_url: string;
    tags: string[];
}

export function useProducts(limit: number = 6) {
    const [products, setProducts] = useState<Product[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const loadMore = () => {
        setPage(prev => prev + 1);
    };

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const res = await axios.get<Product[]>(`${process.env.NEXT_PUBLIC_API_URL}/products/`, {
                    params: {
                        limit,
                        page,
                    },
                });

                setProducts(prev => [...prev, ...res.data]);
                if (res.data.length < limit) setHasMore(false);
            } catch (err) {
                
                console.error(err);
                setHasMore(false);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [page, limit]);

    return { products, loadMore, hasMore, loading };
}
