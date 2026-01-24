"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import type { Category } from "@/types/category";

export function useCategories() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            try {
                const res = await axios.get<Category[]>(
                    `${process.env.NEXT_PUBLIC_API_URL}/categories/`
                );
                setCategories(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return { categories, loading };
}
