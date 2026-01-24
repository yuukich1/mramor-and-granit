"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";

export function ProductSkeletonCard() {
    return (
        <Card className="overflow-hidden h-full flex flex-col bg-white border-neutral-200 animate-pulse">
            <div className="relative aspect-[3/4] bg-neutral-200" />

            <CardContent className="p-6 flex-grow space-y-3">
                <div className="h-5 w-3/4 bg-neutral-200 rounded-md" />
                <div className="h-4 w-1/2 bg-neutral-200 rounded-md" />
                <div className="h-7 w-1/3 bg-neutral-200 rounded-md mt-4" />
            </CardContent>

            <CardFooter className="p-6 pt-0">
                <div className="h-10 w-full bg-neutral-200 rounded-md" />
            </CardFooter>
        </Card>
    );
}
