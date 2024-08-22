import { DataTable } from "@/components/DataTable/data-table";
import { getProducts } from "@/server/queries"
import { columns } from "./_components/column";

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Page() {
  const products = await getProducts();

  return (
    <>
      <h1>Product Admin Page</h1>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={products} />
      </div>
    </>

  )
}