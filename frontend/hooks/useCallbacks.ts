"use client";

import api from "@/api/axiosInstance";
import { useState, useEffect, useCallback } from "react";

export interface CallbackRecord {
    id: number;
    phone: string;
    fullname: string;
    message: string;
    created_at: string;
}

interface UseCallbacksOptions {
    apiLimit?: number;
}

export function useCallbacks({
    apiLimit = 1000,
}: UseCallbacksOptions = {}) {
    const [callbacks, setCallbacks] = useState<CallbackRecord[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchCallbacks = useCallback(async () => {
        setLoading(true);
        try {
            const res = await api.get<CallbackRecord[]>("/callback/", {
                params: {
                    limit: apiLimit,
                },
            });
            setCallbacks(res.data);
        } catch (error: any) {
            if (error.response?.status === 401) {
                console.error("Токен невалиден или отсутствует");
            }
        } finally {
            setLoading(false);
        }
    }, [apiLimit]);

    useEffect(() => {
        fetchCallbacks();
    }, [fetchCallbacks]);

    return {
        callbacks,
        loading,
        refresh: fetchCallbacks,
    };
}
