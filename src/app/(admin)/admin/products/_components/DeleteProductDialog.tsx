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
import { DeleteProduct } from "../_actions/deleteProduct";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  productId: number;
}

function DeleteProductDialog({ open, setOpen, productId }: Props) {

  const deleteMutation = useMutation({
    mutationFn: DeleteProduct,
    onSuccess: async () => {
      toast.success("Product deleted successfully", {
        id: productId,
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
            className="bg-destructive hover:bg-destructive/70 text-white"
            onClick={() => {
              toast.loading("Deleting product...", {
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

export default DeleteProductDialog;
