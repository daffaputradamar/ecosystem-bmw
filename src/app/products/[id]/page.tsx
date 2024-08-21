import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Share2, ShoppingCart } from "lucide-react";
import { getProductById } from "@/server/queries";
import Image from "next/image";
import ProductButton from "./_components/ProductButton";

export default async function ProductDetails({ params }: { params: { id: number } }) {

  // const { data: product, error, isLoading } = useQuery({
  //   queryKey: ['products', params.id],
  //   queryFn: async () => {
  //     const response = await fetch('/api/products/' + params.id);
  //     if (!response.ok) {
  //       throw new Error('Failed to fetch product');
  //     }
  //     return response.json();
  //   },
  // });

  // if (isLoading) return (
  //   <div className="flex flex-col md:flex-row gap-6 lg:gap-12 py-6 max-w-6xl px-4 mx-auto">
  //     <Skeleton className="aspect-square border w-full rounded-lg" />
  //     <div className="flex flex-col w-full gap-4">
  //       <Skeleton className="h-12 border w-full rounded-lg" />
  //       <Skeleton className="h-12 border w-20 rounded-lg" />
  //       <Skeleton className="h-32 border w-full rounded-lg" />
  //     </div>
  //   </div>
  // );
  const IDR = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  })

  const product = await getProductById(params.id);

  return (
    <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
      <div className="grid gap-4 md:gap-6">
        <Image
          src={product.image_url}
          alt="Product Image"
          width={600}
          height={900}
          className="aspect-square object-cover border w-full rounded-lg overflow-hidden"
        />
      </div>
      <div className="grid gap-4 md:gap-8 mt-3">
        <h1 className="font-bold text-xl lg:text-2xl">{product.name}</h1>
        <div className="text-4xl font-bold">{IDR.format(parseFloat(product.price))}</div>
        <div className="grid gap-4 text-sm leading-loose">
          <p>{product.description}</p>
        </div>
        <form className="grid gap-4">
          <ProductButton product={product} />
        </form>
      </div>
    </div>
  )
}