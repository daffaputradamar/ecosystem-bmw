'use client'

import { Skeleton } from "@/components/ui/skeleton";
import Product from "./Product";
import { useQuery } from "@tanstack/react-query";
import { UploadButton } from "@/utils/uploadthing";
import { toast } from "sonner";
import { ProductSchemaType } from "@/schema/product";

export default function ProductList({products}: {products: ProductSchemaType[]}) {

    return (
        <>
            {/* <UploadButton
                endpoint="imageUploader"
                onUploadBegin={() => {
                    toast.loading("Uploading...", { id: "upload-button" });
                }}
                onClientUploadComplete={(res) => {
                    // Do something with the response
                    toast.success("Upload Completed", { id: "upload-button" });
                }}
                onUploadError={(error: Error) => {
                    toast.error("Upload failed", { id: "upload-button" });
                }}
            /> */}
            <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-4 md:px-6 py-12">
                {
                    products?.map((product: ProductSchemaType) => (
                        <Product key={product.id} product={product} />
                    ))
                }
            </section>
        </>
    )
}