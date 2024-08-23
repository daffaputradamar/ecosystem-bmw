import { DataTable } from "@/components/DataTable/data-table";
import { getProducts } from "@/server/queries"
import { columns } from "./_components/column";

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Page() {
  const products = await getProducts();

  return (
    <>
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-8">List Products</h1> 
        <DataTable columns={columns} data={products} />
      </div>
    </>

  )
}