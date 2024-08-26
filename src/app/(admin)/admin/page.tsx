'use client'
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session, status } = useSession();
  
  if (!session) return <div>You need to sign in to view this page</div>;

  return ( 
    <h1>Dashboard Admin Page (En Route)</h1>
  )
}