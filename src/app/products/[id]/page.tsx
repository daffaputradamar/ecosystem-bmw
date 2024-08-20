'use client'

import { useQuery } from "@tanstack/react-query";
import ProductButton from "./_components/ProductButton"
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Share2, ShoppingCart } from "lucide-react";

export default function ProductDetails({ params }: { params: { id: number } }) {

  const { data: product, error, isLoading } = useQuery({
    queryKey: ['products', params.id],
    queryFn: async () => {
      const response = await fetch('/api/products/' + params.id);
      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }
      return response.json();
    },
  });

  if (isLoading) return (
    <div className="flex flex-col md:flex-row gap-6 lg:gap-12 py-6 max-w-6xl px-4 mx-auto">
      <Skeleton className="aspect-square border w-full rounded-lg" />
      <div className="flex flex-col w-full gap-4">
        <Skeleton className="h-12 border w-full rounded-lg" />
        <Skeleton className="h-12 border w-20 rounded-lg" />
        <Skeleton className="h-32 border w-full rounded-lg" />
      </div>
    </div>
  );

  async function onShareHandler() {
    const response = await fetch(product.image);
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
    <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
      <div className="grid gap-4 md:gap-6">
        <img
          src={product.image}
          alt="Product Image"
          width={600}
          height={900}
          className="aspect-square object-cover border w-full rounded-lg overflow-hidden"
        />
      </div>
      <div className="grid gap-4 md:gap-8">
        <h1 className="font-bold text-3xl lg:text-4xl">{product.name}</h1>
        <div className="text-4xl font-bold">${product.price}</div>
        <div className="grid gap-4 text-sm leading-loose">
          <p>{product.description}</p>
        </div>
        <form className="grid gap-4">
          <div className="flex items-center justify-between gap-3">
            <Button type="button" onClick={onAddToCartHandler} size="lg" className="flex-1"><ShoppingCart className="mr-2 h-4" /> Add to Cart</Button>
            <Button type="button" onClick={onShareHandler} size="lg" variant={"secondary"}><Share2 className="mr-2 h-4 w-4" /> Share</Button>
          </div>
        </form>
      </div>
    </div>
  )
}