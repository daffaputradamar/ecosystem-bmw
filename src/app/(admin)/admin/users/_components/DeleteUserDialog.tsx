"use client";


import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";
import { DeleteUser } from "../_actions/deleteUser";

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
    userId: number;
}

function DeleteUserDialog({ open, setOpen, userId }: Props) {

    const deleteMutation = useMutation({
        mutationFn: DeleteUser,
        onSuccess: async () => {
            toast.success("User deleted successfully", {
                id: userId,
            });

        },
        onError: () => {
            toast.error("Something went wrong", {
                id: userId,
            });
        },
    });
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently this User
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                    className="bg-destructive hover:bg-destructive/70 text-white"
                        onClick={() => {
                            toast.loading("Deleting user...", {
                                id: userId,
                            });
                            deleteMutation.mutate(userId);
                        }}
                    >
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default DeleteUserDialog;
