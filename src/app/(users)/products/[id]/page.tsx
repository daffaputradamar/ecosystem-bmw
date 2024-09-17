import { getProductById } from "@/server/queries";
import Image from "next/image";
import ProductButton from "./_components/ProductButton";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { id: number } }): Promise<Metadata> {
  const product = await getProductById(params.id);

  return {
    title: `Ecosystem BMW - ${product.name}`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [
        {
          url: product.image_url,
          width: 800,
          height: 600,
          alt: `${product.name} Image`,
        }
      ],
      type: 'website'
    }
  };
}
export default async function ProductDetails({ params }: { params: { id: number } }) {

  const IDR = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  })

  const product = await getProductById(params.id);

  return (
    <div className="md:container grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
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
          <div dangerouslySetInnerHTML={{ __html: product.description }} />
        </div>
        <form className="grid gap-4">
          <ProductButton product={product} />
        </form>
      </div>
    </div>
  )
}