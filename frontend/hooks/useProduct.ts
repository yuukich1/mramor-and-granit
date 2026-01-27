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

interface UseProductsOptions {
    limit?: number;
    loadAllForFiltering?: boolean;
}

export function useProducts(options: UseProductsOptions = {}) {
    const { limit = 6, loadAllForFiltering = true } = options;
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [displayProducts, setDisplayProducts] = useState<Product[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [loadingAll, setLoadingAll] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const loadMore = () => {
        setPage(prev => prev + 1);
    };

    useEffect(() => {
        if (loadAllForFiltering && !loadingAll) {
            const loadAllProducts = async () => {
                setLoadingAll(true);
                try {
                    const largeLimit = 1000;
                    const res = await axios.get<Product[]>(
                        `${process.env.NEXT_PUBLIC_API_URL}/products/`,
                        {
                            params: { limit: largeLimit, page: 1 },
                        }
                    );
                    setAllProducts(res.data);
                } catch (err) {
                    console.error(err);
                } finally {
                    setLoadingAll(false);
                }
            };
            loadAllProducts();
        }
    }, [loadAllForFiltering]);

    useEffect(() => {
        const fetchPage = async () => {
            setLoading(true);
            try {
                const res = await axios.get<Product[]>(
                    `${process.env.NEXT_PUBLIC_API_URL}/products/`,
                    {
                        params: { limit, page },
                    }
                );

                setDisplayProducts(prev => [...prev, ...res.data]);
                if (res.data.length < limit) setHasMore(false);
            } catch (err) {
                console.error(err);
                setHasMore(false);
            } finally {
                setLoading(false);
            }
        };

        fetchPage();
    }, [page, limit]);

    return {
        allProducts,
        displayProducts,
        loadMore,
        hasMore,
        loading,
        loadingAll,
    };
}