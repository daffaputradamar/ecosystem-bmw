"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import { usePathname } from "next/navigation"

function MoneyIcon(props: any) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
    )
}

function MenuIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
    )
}

export default function Navbar() {

    const menus = [
        {
            path: "/",
            name: "Home"
        },
        {
            path: "/about",
            name: "About"
        },
        {
            path: "/contact",
            name: "Contact"
        },
        {
            path: "/blog",
            name: "Blog"
        }
    ]

    let pathName = usePathname()
    pathName = "/" + pathName.split("/")[1]

    const session = true
    const isAdmin = true

    return (
        <nav className="inset-x-0 top-0 z-50">
            <div className="w-full max-w-7xl mx-auto px-4 py-2">
                <div className="flex justify-between h-14 items-center">
                    <Link className="flex items-center" href="/">
                        <MoneyIcon className="h-6 w-6" />
                        <span className="sr-only">Daffa Inc</span>
                    </Link>
                    <nav className="hidden md:flex gap-5">
                        {menus.map((menu) => {
                            return (
                                <Link key={menu.path} className={`font-medium flex items-center text-sm transition-colors hover:underline px-4 ${(pathName === menu.path) ? "bg-primary py-2 rounded-lg text-primary-foreground" : ""}`} href={menu.path}>
                                    {menu.name}
                                </Link>
                            )
                        })}
                    </nav>
                    <div className="flex items-center gap-4">
                        {
                            (session) ? (
                                <>
                                    {
                                        (isAdmin) && <Link className={`font-medium flex items-center text-sm transition-colors hover:underline px-4 ${(pathName === '/admin') ? "bg-primary py-2 rounded-lg text-primary-foreground" : ""}`} href={'/admin'}>
                                            Admin
                                        </Link>
                                    }
                                    <Link href="#">
                                        <Button size="sm" variant="outline">
                                            Sign Out
                                        </Button>
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link href="/login">
                                        <Button size="sm" variant="outline">
                                            Sign in
                                        </Button>
                                    </Link>
                                    <Link href="/register">
                                        <Button size="sm">Sign up</Button>
                                    </Link>
                                </>
                            )
                        }


                        <Sheet>
                            <SheetTrigger asChild>
                                <Button className="md:hidden" size="icon" variant="outline">
                                    <MenuIcon className="h-6 w-6" />
                                    <span className="sr-only">Toggle navigation menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side={"left"}>
                                <div className="flex flex-col justify-between h-full">
                                    <div className="grid gap-2 py-6">
                                        {menus.map((menu) => (
                                            <Link key={menu.path} className={`flex w-full items-center py-2 px-3 text-lg font-semibold ${(pathName === menu.path) ? "bg-primary rounded-md text-primary-foreground" : ""}`} href={menu.path}>
                                                {menu.name}
                                            </Link>
                                        ))}
                                    </div>

                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </nav>
    )
}