"use client";

import { useState } from "react";
import { Callback } from "@/types/callback";
import { createCallback } from "@/api/callback.api";

export function useCallbackForm() {
    const [loading, setLoading] = useState(false);    
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const submit = async (data: Callback) => {
        try {
            setLoading(true);
            setError(null);

            await createCallback(data);

            setSuccess(true);
        } catch (e) {
            setError("Failed to submit the form. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return {
        submit,
        loading,
        success,
        error,
    };
}