'use client'

import { Skeleton } from "@/components/ui/skeleton";
import Product from "./Product";
import { useQuery } from "@tanstack/react-query";

export default function ProductList(props: any) {

    const { data: products, error, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
          const response = await fetch('/api/products');
          if (!response.ok) {
            throw new Error('Failed to fetch products');
          }
          return response.json();
        },
      });
    
    if(isLoading) return (
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-4 md:px-6 py-12">
            {[1, 2, 3, 4, 5, 6].map((index: number) => (
                <Skeleton key={index} className="aspect-[4/5] shadow-md w-full rounded-lg overflow-hidden" />
            ))}
        </section>
    );
    
    return (
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-4 md:px-6 py-12">
            {
                products?.map((product: any) => (
                    <Product key={product.id} product={product} />
                ))
            }
        </section>
    )
}