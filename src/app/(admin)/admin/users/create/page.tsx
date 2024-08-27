'use client'

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateUser } from "../_actions/createUser";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, PlusCircle } from "lucide-react";
import { useUploadThing } from "@/utils/uploadthing";
import { useState } from "react";
import { InsertUserSchema, InsertUserSchemaType } from "@/schema/users";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter()
    const queryClient = useQueryClient();
    const [isUploading, setIsUploading] = useState(false);

    const { mutate, isPending } = useMutation({
        mutationFn: CreateUser,
        onSuccess: async (data: InsertUserSchemaType) => {
            form.reset({
                name: "",
                username: "",
                password: "",
                confirmPassword: "",
                role: "user"
            });

            toast.success(`User ${data.name} created successfully 🎉`, {
                id: "create-user",
            });

            await queryClient.invalidateQueries({
                queryKey: ["users"],
            });
            
            router.push("/admin/users")

        },
        onError: (e) => {
            console.log(e);

            toast.error("Something went wrong", {
                id: "create-user",
            });
        },
    });

    const onSubmit = async (values: InsertUserSchemaType) => {

        toast.loading("Creating user...", {
            id: "create-user",
        });
        mutate(form.getValues());
    }

    const form = useForm<InsertUserSchemaType>({
        resolver: zodResolver(InsertUserSchema),
        defaultValues: {
            name: "",
            username: "",
            password: "",
            confirmPassword: "",
            role: "user"
        }
    });
    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Create User</h1>
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
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="Username" {...field} className="min-w-36" />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="******" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="******" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Role</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a verified email to display" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="user">User</SelectItem>
                                        <SelectItem value="admin">Admin</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />

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