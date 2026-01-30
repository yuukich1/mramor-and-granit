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
  initialVisible?: number;
  apiLimit?: number;
}

export function useProducts({
  initialVisible = 6,
  apiLimit = 1000,
}: UseProductsOptions = {}) {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [visibleCount, setVisibleCount] = useState(initialVisible);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get<Product[]>(
          `${process.env.NEXT_PUBLIC_API_URL}/products/`,
          {
            params: { limit: apiLimit },
          }
        );
        setAllProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [apiLimit]);

  const hasMore = visibleCount < allProducts.length;

  const loadMore = () => {
    if (hasMore) {
      setVisibleCount(prev => prev + initialVisible);
    }
  };

  const resetVisible = () => {
    setVisibleCount(initialVisible);
  };

  return {
    allProducts,
    visibleCount,
    loadMore,
    resetVisible,
    hasMore,
    loading,
  };
}
