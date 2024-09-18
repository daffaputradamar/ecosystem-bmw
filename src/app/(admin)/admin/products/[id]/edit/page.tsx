'use client'

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InsertProductSchema, InsertProductSchemaType, ProductSchemaType } from "@/schema/product";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Loader2, PencilIcon, Trash } from "lucide-react";
import { useUploadThing } from "@/utils/uploadthing";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import SkeletonWrapper from "@/components/SkeletonWrapper/skeleton-wrapper";
import Image from "next/image";
import Link from "next/link";
import { UpdateProduct } from "../../_actions/updateProduct";
import RictTextEditor from "@/components/RichText/rich-text";
import { DeleteProductImage } from "../../_actions/deleteProductImage";
import { ProductImageSchemaType } from "@/schema/product_images";

export default function Page() {
    const router = useRouter();
    const params = useParams<{ id: string }>()
    const queryClient = useQueryClient();
    const [isUploading, setIsUploading] = useState(false);

    const { data: product, isLoading: isLoadingProduct, error: errorProduct } = useQuery<ProductSchemaType>({
        queryKey: ["products", params.id],
        queryFn: async () => {
            const res = await fetch(`/api/products/${params.id}`);
            if (!res.ok) throw new Error('Product not found');
            return res.json();
        },
    });

    const { data: productImages, isLoading: isLoadingProductImages, error: errorProductImages } = useQuery({
        queryKey: ["product_images", params.id],
        queryFn: async () => {
            const res = await fetch(`/api/products/${params.id}/images`);
            if (!res.ok) throw new Error('Error fetching product images');
            return res.json();
        },
    });

    if (errorProduct) {
        toast.error("Something went wrong, Can't get the product");
        router.push("/admin/products");
    }

    const form = useForm<InsertProductSchemaType>({
        resolver: zodResolver(InsertProductSchema),
        defaultValues: {
            name: "",
            description: "",
            price: "",
            image_url: "",
        }
    });

    useEffect(() => {
        if (product) {
            form.reset({
                name: product.name || "",
                description: product.description || "",
                price: product.price || "",
                image_url: product.image_url || "",
            });
        }
    }, [product, form]);

    const { mutate: mutateProduct, isPending: isPendingProduct } = useMutation({
        mutationFn: UpdateProduct,
        onSuccess: async (data: InsertProductSchemaType) => {
            form.reset({
                name: "",
                description: "",
                price: "",
                image_url: "",
                file: "",
            });

            toast.success(`Product ${data.name} updated successfully 🎉`, {
                id: "update-product",
            });

            await queryClient.invalidateQueries({
                queryKey: ["products", params.id],
            });

        },
        onError: (e) => {
            console.log(e);

            toast.error("Something went wrong", {
                id: "update-product",
            });
        },
    });

    const onSubmit = async (values: InsertProductSchemaType) => {

        if (values.file) {
            setIsUploading(true);

            const selectedFile = Array.from([values.file]);
            const result = await $ut.startUpload(selectedFile as File[]);

            if (!result) {
                toast.error("Upload failed, can't get the url", { id: "upload-button" });
                return;
            }
            form.setValue("file", null);
            form.setValue("image_url", result[0].url);
        }

        if ((productImages?.length ?? 0) + values.images.length > 4) {
            toast.error("Max supporting images is 4.", { id: "upload-button" });
            return;
        }
        
        console.log(values);
        

        if(values.images.length > 0) {
            const selectedFile = Array.from([...values.images]);
            const result = await $ut.startUpload(selectedFile as File[]);

            if (!result) {
                toast.error("Upload supporting image failed, can't get the url", { id: "upload-button" });
                return;
            }

            form.setValue("images", result.map(v => ({ url: v.url })));
        }

        form.setValue("id", parseInt(params.id));

        toast.loading("Updating product...", {
            id: "update-product",
        });
        mutateProduct(form.getValues());
    }

    const { mutate: mutateProductImage, isPending: isPendingProductImage } = useMutation({
        mutationFn: DeleteProductImage,
        onSuccess: async () => {

            toast.success(`Image deleted successfully 🎉`, {
                id: "delete-product-image",
            });

            await queryClient.invalidateQueries({
                queryKey: ["product_images", params.id],
            });

        },
        onError: (e) => {
            toast.error("Something went wrong", {
                id: "delete-product-image",
            });
        },
    });

    const handleDeleteImage = async (imageId: number) => {
        mutateProductImage(imageId);
    };

    const $ut = useUploadThing("imageUploader", {
        onUploadBegin: () => {
            toast.loading("Uploading...", { id: "upload-button" });
        },
        onClientUploadComplete: () => {
            setIsUploading(false);
            toast.success("Upload Completed", { id: "upload-button" });
        },
        onUploadError: () => {
            setIsUploading(false);
            toast.error("Upload failed", { id: "upload-button" });
        },

    });


    return (
        <SkeletonWrapper isLoading={isLoadingProduct && isLoadingProductImages}>
            <div>
                <Link href="/admin/products" className="mb-8 flex items-center"><ChevronLeft className="w-5 h-5 mr-2" /> <span className="underline">Back to List Product</span></Link>
                <h1 className="text-3xl font-bold mb-8">Edit Product</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Name" {...field} className="min-w-36" />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <RictTextEditor placeholder="Description" onChange={e => { form.setValue("description", e) }} value={form.getValues("description")} />
                            </FormControl>
                        </FormItem>

                        {/* <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                    </FormControl>
                                </FormItem>
                            )}
                        /> */}
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="Price" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <div className="flex gap-8">
                            {
                                form.getValues("image_url") &&
                                <div className="flex flex-col gap-4">
                                    <span className="text-sm font-medium">Current Main Image</span>
                                    <Link href={form.getValues("image_url")} target="_blank">
                                        <Image
                                            src={form.getValues("image_url")}
                                            alt="Product Image"
                                            width={600}
                                            height={900}
                                            className="aspect-square object-cover border w-[200px] rounded-lg overflow-hidden"
                                        />
                                    </Link>
                                </div>
                            }
                            <FormField
                                control={form.control}
                                name="file"
                                render={({ field: { value, onChange, ...fieldProps } }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Update Main Image</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Select file"
                                                type="file"
                                                accept="image/*"
                                                {...fieldProps}
                                                onChange={(event) =>
                                                    onChange(event.target.files && event.target.files[0])
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>


                        <div className="flex gap-8">
                            {productImages && productImages.map((image: ProductImageSchemaType, index: number) => (
                                <div key={image.id} className="relative">
                                    <Image
                                        src={image.image_url}
                                        alt={`Product Image ${index + 1}`}
                                        width={150}
                                        height={150}
                                        className="aspect-square object-cover border w-[150px] rounded-lg overflow-hidden"
                                    />
                                    <button
                                        type="button"
                                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                                        onClick={() => handleDeleteImage(image.id)}
                                    >
                                        <Trash className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}

                            {(productImages?.length ?? 0) < 4 && (
                                <FormField
                                    control={form.control}
                                    name="images"
                                    render={({ field: { value, onChange, ...fieldProps } }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Add Supporting Image <span className="text-xs">(Max. 4 images)</span></FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Select image"
                                                    type="file"
                                                    accept="image/*"
                                                    multiple
                                                    {...fieldProps}
                                                    onChange={(event) =>
                                                        onChange(event.target.files && event.target.files)
                                                    }
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}
                        </div>

                        <Button onClick={form.handleSubmit(onSubmit)} disabled={isPendingProduct || isUploading}>
                            {!(isPendingProduct || isUploading) && <>
                                <PencilIcon className="w-5 h-5 mr-2" />
                                Update
                            </>}
                            {(isPendingProduct || isUploading) && <>
                                <Loader2 className="animate-spin w-5 h-5 mr-2" />
                                Updating...
                            </>}
                        </Button>
                    </form>
                </Form>
            </div>
        </SkeletonWrapper>
    )
}