import { authConfig } from "@/app/api/auth/[...nextauth]/config"
import { getServerSession } from "next-auth"

export default async function Page() {
  const session = await getServerSession(authConfig) 
  console.log(session);
  
  return ( 
    <h1>Users Admin Page</h1>
  )
}