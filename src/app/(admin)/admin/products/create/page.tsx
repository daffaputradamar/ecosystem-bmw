'use client'

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InsertProductSchema, InsertProductSchemaType } from "@/schema/product";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateProduct } from "../_actions/createProduct";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Loader2, PlusCircle } from "lucide-react";
import { useUploadThing } from "@/utils/uploadthing";
import { useState } from "react";
import { useRouter } from "next/navigation";
import RictTextEditor from "@/components/RichText/rich-text";
import Link from "next/link";

export default function Page() {
  const router = useRouter()
  const queryClient = useQueryClient();
  const [isUploading, setIsUploading] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: CreateProduct,
    onSuccess: async (data: InsertProductSchemaType) => {
      form.reset({
        name: "",
        description: "",
        price: "",
        image_url: "",
        file: "",
        images: [],
      });

      toast.success(`Product ${data.name} created successfully 🎉`, {
        id: "create-product",
      });

      await queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      router.push("/admin/products")

    },
    onError: (e) => {
      console.log(e);

      toast.error("Something went wrong", {
        id: "create-product",
      });
    },
  });

  const onSubmit = async (values: InsertProductSchemaType) => {

    if (!values.file) {
      toast.error("Please select an image", { id: "upload-button" });
      return;
    }

    if (values.images.length > 4) {
      toast.error("Max supporting images is 4.", { id: "upload-button" });
      return;
    }

    setIsUploading(true);

    const selectedFile = Array.from([values.file, ...values.images]);
    const result = await $ut.startUpload(selectedFile as File[]);

    if (!result) {
      toast.error("Upload failed, can't get the url", { id: "upload-button" });
      return;
    }

    form.setValue("file", null);
    form.setValue("image_url", result[0].url);
    form.setValue("images", result.slice(1).map(v => ({ url: v.url })));


    toast.loading("Creating product...", {
      id: "create-product",
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

  const form = useForm<InsertProductSchemaType>({
    resolver: zodResolver(InsertProductSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      image_url: "",
      images: [],
    }
  });
  return (
    <div>
      <Link href="/admin/products" className="mb-8 flex items-center"><ChevronLeft className="w-5 h-5 mr-2" /> <span className="underline">Back to List Product</span></Link>
      <h1 className="text-3xl font-bold mb-8">Create Product</h1>
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

          <FormField
            control={form.control}
            name="file"
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel>Main Image</FormLabel>
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

          <FormField
            control={form.control}
            name="images"
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel>Supporting Images <span className="text-xs">(Max. 4 images)</span></FormLabel>
                <FormControl>
                  <Input type="file"
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

          {/* <UploadButton /> */}

          <Button onClick={form.handleSubmit(onSubmit)} disabled={isPending || isUploading}>
            {!(isPending || isUploading) && <>
              <PlusCircle className="w-5 h-5 mr-2" />
              Create
            </>}
            {(isPending || isUploading) && <>
              <Loader2 className="animate-spin w-5 h-5 mr-2" />
              Creating...
            </>}
          </Button>
        </form>
      </Form>
    </div>
  )
}