'use client'

import { Button } from "@/components/ui/button"
import { ProductType } from "@/server/db/schema";
import { Share2, ShoppingCart } from "lucide-react"
import { toast } from "sonner";

export default function ProductButton({ product }: { product: ProductType }) { 
    async function onShareHandler() {
        const response = await fetch(product.image_url);
        const blob = await response.blob();
    
        let filename = 'product-image.jpg'; // Default filename
        let fileType = blob.type || 'image/jpeg'; // Default file type
    
        const contentDisposition = response.headers.get('Content-Disposition');
        console.log(contentDisposition);
        
        if (contentDisposition) {
          const filenameMatch = contentDisposition.match(/filename="(.+)"/);
          if (filenameMatch && filenameMatch.length > 1) {
            filename = filenameMatch[1];
          }
        }
    
        const file = new File([blob], filename, { type: fileType });
        if (navigator.share) {
          navigator.share({
            title: product.name,
            text: product.description,
            url: window.location.href, // The current page URL
            files: [
              file
            ],
          })
        } else {
          toast.error("Share feature is not supported in your browser.")
        }
      }
    
      function onAddToCartHandler() {
        console.log('add to cart')
      }

      
    return (
        <div className="flex items-center justify-between gap-3">
            <Button type="button" disabled onClick={onAddToCartHandler} size="lg" className="flex-1"><ShoppingCart className="mr-2 h-4" /> Add to Cart</Button>
            <Button type="button" onClick={onShareHandler} size="lg" variant={"secondary"}><Share2 className="mr-2 h-4 w-4" /> Share</Button>
        </div>
    )
}