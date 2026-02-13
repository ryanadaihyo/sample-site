"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState, useTransition } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function Search({ placeholder = "コンテンツを検索..." }: { placeholder?: string }) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [isPending, startTransition] = useTransition()
    const [query, setQuery] = useState(searchParams.get("q") || "")

    function handleSearch(term: string) {
        setQuery(term)
        startTransition(() => {
            const params = new URLSearchParams(searchParams)
            if (term) {
                params.set("q", term)
            } else {
                params.delete("q")
            }
            router.replace(`/?${params.toString()}`)
        })
    }

    return (
        <div className="relative w-full max-w-sm">
            <Input
                type="search"
                placeholder={placeholder}
                className="pr-10"
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
            />
        </div>
    )
}
