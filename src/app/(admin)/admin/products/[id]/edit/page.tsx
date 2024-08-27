'use client'

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InsertProductSchema, InsertProductSchemaType, ProductSchemaType } from "@/schema/product";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, PencilIcon, PlusCircle } from "lucide-react";
import { useUploadThing } from "@/utils/uploadthing";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import SkeletonWrapper from "@/components/SkeletonWrapper/skeleton-wrapper";
import Image from "next/image";
import Link from "next/link";
import { UpdateProduct } from "../../_actions/updateProduct";

export default function Page() {
    const router = useRouter();
    const params = useParams<{ id: string }>()
    const queryClient = useQueryClient();
    const [isUploading, setIsUploading] = useState(false);

    const { data: product, isLoading, error } = useQuery<ProductSchemaType>({
        queryKey: ["products", params.id],
        queryFn: async () => {
            const res = await fetch(`/api/products/${params.id}`);
            if (!res.ok) throw new Error('Product not found');
            return res.json();
        },
    });

    if (error) {
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

    const { mutate, isPending } = useMutation({
        mutationFn: UpdateProduct,
        onSuccess: async (data: InsertProductSchemaType) => {
            form.reset({
                name: "",
                description: "",
                price: "",
                image_url: "",
                file: "",
            });

            toast.success(`Product ${data.name} created successfully 🎉`, {
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

        form.setValue("id", parseInt(params.id));

        toast.loading("Updating product...", {
            id: "update-product",
        });
        mutate(form.getValues());
    }

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
        <SkeletonWrapper isLoading={isLoading}>
            <div>
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
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Description" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
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

                        <div className="flex gap-14">
                            <FormField
                                control={form.control}
                                name="file"
                                render={({ field: { value, onChange, ...fieldProps } }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Image</FormLabel>
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
                            {
                                form.getValues("image_url") && 
                                <div className="flex flex-col items-end gap-4">
                                    <span className="text-sm font-medium">Current Image</span>
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
                        </div>


                        {/* <UploadButton /> */}

                        <Button onClick={form.handleSubmit(onSubmit)} disabled={isPending || isUploading}>
                            {!(isPending || isUploading) && <>
                                <PencilIcon className="w-5 h-5 mr-2" />
                                Update
                            </>}
                            {(isPending || isUploading) && <>
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