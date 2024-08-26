import { DataTable } from "@/components/DataTable/data-table";
import { getUsers } from "@/server/queries"
import { columns } from "./_components/column";

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Page() {
  const products = await getUsers();

  return (
    <>
      <h1 className="text-3xl font-bold mb-8">List Users</h1> 
      <DataTable columns={columns} data={products} />
    </>

  )
}