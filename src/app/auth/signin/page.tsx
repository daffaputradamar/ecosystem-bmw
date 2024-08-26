import { redirect } from "next/navigation";
import AuthForm from "./_components/auth-form";
import { getServerSession } from "next-auth";
import { authConfig } from "@/app/api/auth/[...nextauth]/config";

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function Page() {

  const session = await getServerSession(authConfig) 
  if (session) {
    if(session.user.role === "admin") {
      return redirect("/admin")
    } else {
      return redirect("/")
    }
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <AuthForm />
    </div>
  )
}