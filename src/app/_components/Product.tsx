export default function Product({ product }: any) {
    return (
        <div className="bg-background rounded-lg shadow-sm overflow-hidden">
            <div>
            <img
                src={product.image}
                alt={product.description}
                width={200}
                height={250}
                className="object-cover w-full h-full aspect-square"
            />
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">Wireless Headphones</h3>
                <p className="text-2xl font-bold">$99.99</p>
            </div>
        </div>)
}