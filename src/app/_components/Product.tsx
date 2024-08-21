import { ProductType } from "@/server/db/schema";
import Image from "next/image";
import Link from "next/link";

export default function Product({ product }: { product: ProductType }) {
    const IDR = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
    })

    return (
        <div className="dark:border dark:border-primary/20 relative overflow-hidden transition-transform duration-300 ease-in-out rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-1">
            <Link href={`/products/${product.id}`} className="absolute inset-0 z-10" prefetch={false}>
                <span className="sr-only">View</span>
            </Link>
            <Image
                src={product.image_url}
                alt={product.description}
                width={500}
                height={500}
                className="object-cover w-full h-64 aspect-square"
            />
            <div className="p-4 flex flex-col gap-3 bg-card">
                <p className="text-lg">{product.name}</p>
                <p className="text-lg font-semibold md:text-xl">{IDR.format(parseFloat(product.price))}</p>
            </div>
        </div>

    )
}