"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import { usePathname, useRouter } from "next/navigation"
import LogoIcon from "../icons/logo"
import MenuIcon from "../icons/menu"
import { signOut, useSession } from "next-auth/react"
import { Skeleton } from "../ui/skeleton"

export default function Navbar() {
    const { data: session, status } = useSession();
    const router = useRouter()

    const menus: {
        path: string;
        name: string;
    }[] = [
            // {
            //     path: "/products",
            //     name: "Products"
            // }
        ]

    let pathName = usePathname()
    pathName = "/" + pathName.split("/")[1]

    const isAdmin = session?.user?.role === "admin"

    const handleLogout = async () => {
        await signOut({ redirect: false });
        router.push("/")
    }

    return (
        <nav className="inset-x-0 top-0 z-50">
            <div className="w-full max-w-7xl mx-auto px-4 py-2">
                <div className="flex justify-between h-14 items-center">
                    <Link className="flex items-center" href="/">
                        <LogoIcon className="h-20 w-20 text-primary" /> 
                        <span className="sr-only">Ecosystem BMW</span>
                    </Link>
                    <nav className="hidden md:flex gap-5">
                        {menus.map((menu) => {
                            const isActive = pathName === menu.path;

                            return (
                                <Link key={menu.path} className={`font-medium flex items-center text-sm transition-colors hover:underline px-4 ${isActive ? "bg-primary py-2 rounded-lg text-primary-foreground" : ""}`} href={menu.path}>
                                    {menu.name}
                                </Link>
                            )
                        })}
                    </nav>

                    <div className="flex items-center gap-4">
                        {status === 'loading' ? <Skeleton className="w-36 h-12 rounded-xl bg-gray-200 dark:bg-gray-700" /> :
                            (status === "authenticated") ? (
                                <>
                                    {
                                        (isAdmin) && <Link className={`font-medium flex items-center text-sm transition-colors hover:underline px-4 ${(pathName === '/admin') ? "bg-primary py-2 rounded-lg text-primary-foreground" : ""}`} href={'/admin'}>
                                            Admin
                                        </Link>
                                    }
                                    <Button size="sm" variant="outline" onClick={handleLogout}>
                                        Sign Out
                                    </Button>
                                </>
                            ) : (
                                <>
                                    {/* <Link href="/auth/signin">
                                        <Button size="sm" variant="outline">
                                            Sign in
                                        </Button>
                                    </Link> */}
                                    <Link href="/auth/signin" >
                                        <Button size="sm">Login / Register</Button>
                                    </Link>
                                </>
                            )
                        }


                        {
                            menus.length > 0 && <Sheet>
                                <SheetTrigger asChild>
                                    <Button className="md:hidden" size="icon" variant="outline">
                                        <MenuIcon className="h-6 w-6" />
                                        <span className="sr-only">Toggle navigation menu</span>
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side={"left"}>
                                    <div className="flex flex-col justify-between h-full">
                                        <div className="grid gap-2 py-6">
                                            {menus.map((menu) => {
                                                const isActive = pathName === menu.path

                                                return (
                                                    <Link key={menu.path} className={`flex w-full items-center py-2 px-3 text-lg font-semibold ${isActive ? "bg-primary rounded-md text-primary-foreground" : ""}`} href={menu.path}>
                                                        {menu.name}
                                                    </Link>)
                                            })}
                                        </div>

                                    </div>
                                </SheetContent>
                            </Sheet>
                        }

                    </div>
                </div>
            </div>
        </nav>
    )
}