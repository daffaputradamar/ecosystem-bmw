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
import { DeleteTransaction } from "../_actions/deleteProduct";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  productId: number;
}

function DeleteTransactionDialog({ open, setOpen, productId }: Props) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: DeleteTransaction,
    onSuccess: async () => {
      toast.success("Product deleted successfully", {
        id: productId,
      });

      await queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
    onError: () => {
      toast.error("Something went wrong", {
        id: productId,
      });
    },
  });
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            product
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              toast.loading("Deleting transaction...", {
                id: productId,
              });
              deleteMutation.mutate(productId);
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteTransactionDialog;
