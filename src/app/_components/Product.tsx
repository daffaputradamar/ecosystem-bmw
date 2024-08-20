import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Product({ product }: any) {
    return (
        <div className="dark:border dark:border-primary/20 relative overflow-hidden transition-transform duration-300 ease-in-out rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-1">
            <Link href={`/products/${product.id}`} className="absolute inset-0 z-10" prefetch={false}>
                <span className="sr-only">View</span>
            </Link>
            <img
                src={product.image}
                alt={product.description}
                width={500}
                height={500}
                className="object-cover w-full h-64 aspect-square"
            />
            <div className="p-4 bg-card">
                <h3 className="text-xl font-bold">{product.name}</h3>
                <p className="text-sm text-muted-foreground">Handcrafted with premium silk</p>
                <h4 className="text-lg font-semibold md:text-xl">$99.99</h4>
            </div>
        </div>

    )
}