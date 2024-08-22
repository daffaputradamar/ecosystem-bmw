"use client"

import { ProductSchemaType } from "@/schema/product"
import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<ProductSchemaType>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({row}) => {
      const price = parseFloat(row.getValue("price"))
      const formatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(price)

      return <div>{ formatted }</div>
    },
  },
  {
    accessorKey: "image_url",
    header: "Image",
  },
]
