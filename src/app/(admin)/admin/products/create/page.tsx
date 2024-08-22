'use client'

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InsertProductSchema, InsertProductSchemaType } from "@/schema/product";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateProduct } from "./_actions/createProduct";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, PlusCircle } from "lucide-react";
import { useUploadThing } from "@/utils/uploadthing";

export default function Page() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: CreateProduct,
    onSuccess: async (data: InsertProductSchemaType) => {
      form.reset({
        name: "",
        description: "",
        price: "",
        image_url: "",
      });

      toast.success(`Product ${data.name} created successfully 🎉`, {
        id: "create-product",
      });

      await queryClient.invalidateQueries({
        queryKey: ["products"],
      });

    },
    onError: (e) => {
      console.log(e);
      
      toast.error("Something went wrong", {
        id: "create-product",
      });
    },
  });

  const onSubmit = async (values: InsertProductSchemaType) => {
    console.log(values);
    
    if (!values.file) {
      toast.error("Please select an image", { id: "upload-button" });
      return;
    }

    const selectedFile = Array.from([values.file]);
    const result = await $ut.startUpload(selectedFile as File[]);

    if (!result) {
      toast.error("Upload failed, can't get the url", { id: "upload-button" });
      return;
    }
    form.setValue("file", null);
    form.setValue("image_url", result[0].url);

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
      toast.success("Upload Completed", { id: "upload-button" });
    },
    onUploadError: () => {
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
    }
  });
  return (
    <>
      <h1>Create Product Admin Page</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
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

          <FormField
            control={form.control}
            name="file"
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem>
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

          {/* <UploadButton /> */}

          <Button onClick={form.handleSubmit(onSubmit)} disabled={isPending}>
            {!isPending && <>
              <PlusCircle className="w-5 h-5 mr-2" />
              Create
            </>}
            {isPending && <>
              <Loader2 className="animate-spin" />
              Creating...
            </>}
          </Button>
        </form>
      </Form>
    </>
  )
}