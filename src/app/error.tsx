"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Unhandled error:", error);
    }, [error]);

    return (
        <div className="flex items-center justify-center py-32">
            <div className="flex flex-col items-center gap-6 text-center max-w-md px-4">
                <div className="rounded-full bg-destructive/10 p-4">
                    <svg
                        className="h-8 w-8 text-destructive"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </div>
                <div className="space-y-2">
                    <h2 className="text-xl font-semibold">エラーが発生しました</h2>
                    <p className="text-sm text-muted-foreground">
                        申し訳ございません。予期しないエラーが発生しました。
                    </p>
                </div>
                <Button onClick={reset} variant="outline">
                    もう一度試す
                </Button>
            </div>
        </div>
    );
}
