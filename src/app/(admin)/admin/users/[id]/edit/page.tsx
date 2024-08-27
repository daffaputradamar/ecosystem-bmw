'use client'

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Edit, Loader2, PencilIcon, PlusCircle } from "lucide-react";
import { useEffect } from "react";
import { EditUserSchemaType, EditUserSchema, UserSchemaType } from "@/schema/users";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useParams, useRouter } from "next/navigation";
import { UpdateUser } from "../../_actions/updateUser";
import SkeletonWrapper from "@/components/SkeletonWrapper/skeleton-wrapper";

export default function Page() {
    const router = useRouter()
    const params = useParams<{ id: string }>()
    const queryClient = useQueryClient();

    const { data: user, isLoading, error } = useQuery<UserSchemaType>({
        queryKey: ["users", params.id],
        queryFn: async () => {
            const res = await fetch(`/api/users/${params.id}`);
            if (!res.ok) throw new Error('User not found');
            return res.json();
        },
    });

    if (error) {
        toast.error("Something went wrong, Can't get the user");
        router.push("/admin/users");
    }

    const form = useForm<EditUserSchemaType>({
        resolver: zodResolver(EditUserSchema),
        defaultValues: {
            name: "",
            username: "",
            role: "user"
        }
    });

    useEffect(() => {
        if (user) {
            form.reset({
                name: user.name || "",
                username: user.username || "",
                role: user.role || "user"
            });
        }
    }, [user, form]);

    const { mutate, isPending } = useMutation({
        mutationFn: UpdateUser,
        onSuccess: async (data: EditUserSchemaType) => {
            form.reset({
                name: "",
                username: "",
                role: "user"
            });

            toast.success(`User ${data.name} updated successfully 🎉`, {
                id: "update-user",
            });

            await queryClient.invalidateQueries({
                queryKey: ["users", params.id],
            });

            router.push("/admin/users")

        },
        onError: (e) => {
            console.log(e);

            toast.error("Something went wrong", {
                id: "update-user",
            });
        },
    });

    const onSubmit = async (values: EditUserSchemaType) => {
        form.setValue("id", parseInt(params.id));
        
        toast.loading("Updating user...", {
            id: "update-user",
        });
        

        mutate(form.getValues());
    }

    return (
        <SkeletonWrapper isLoading={isLoading}>

            <div>
                <h1 className="text-3xl font-bold mb-8">Edit User</h1>
                <Form {...form}>
                    <form key={form.watch('role')} onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                            name="role"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Role</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Role" />
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

                        <Button onClick={form.handleSubmit(onSubmit)} disabled={isPending}>
                            {!(isPending) && <>
                                <PencilIcon className="w-5 h-5 mr-2" />
                                Update
                            </>}
                            {(isPending) && <>
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