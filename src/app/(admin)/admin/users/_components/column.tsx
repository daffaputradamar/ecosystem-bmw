"use client"

import { ProductSchemaType } from "@/schema/product"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, PencilIcon, TrashIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"
import DeleteUserDialog from "./DeleteUserDialog"
import Image from "next/image"
import { UserSchemaType } from "@/schema/users"
import Link from "next/link"

export const columns: ColumnDef<UserSchemaType>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Role
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Registered at
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      const formattedDate = date.toLocaleDateString("id-ID", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
      return <div className="text-muted-foreground">{formattedDate}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <RowActions user={row.original} />
  },
]


function RowActions({ user }: { user: UserSchemaType }) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <>
      <DeleteUserDialog
        open={showDeleteDialog}
        setOpen={setShowDeleteDialog}
        userId={user.id}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} className="h-8 w-8 p-0 ">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href={`/admin/users/${user.id}/edit`}>
            <DropdownMenuItem
              className="flex items-center gap-2 cursor-pointer"
            >
              <PencilIcon className="h-4 w-4" />
              Edit
            </DropdownMenuItem>
          </Link>
          {
            user.role !== "admin" && 
            <DropdownMenuItem
              className="flex items-center gap-2 text-destructive cursor-pointer"
              onSelect={() => {
                setShowDeleteDialog((prev) => !prev);
              }}
            >
              <TrashIcon className="h-4 w-4" />
              Delete
            </DropdownMenuItem>
          }
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}