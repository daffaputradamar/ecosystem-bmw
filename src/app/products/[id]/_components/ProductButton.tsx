'use client'

import { Button } from "@/components/ui/button"
import { Share2, ShoppingCart } from "lucide-react"

export default function ProductButton({ onShareHandler, onAddToCartHandler }: { onShareHandler: any, onAddToCartHandler: any }) {
    return (
        <div className="flex items-center justify-between gap-3">
            <Button type="button" onClick={onAddToCartHandler} size="lg" className="flex-1"><ShoppingCart className="mr-2 h-4" /> Add to Cart</Button>
            <Button type="button" onClick={onShareHandler} size="lg" variant={"secondary"}><Share2 className="mr-2 h-4 w-4" /> Share</Button>
        </div>
    )
}