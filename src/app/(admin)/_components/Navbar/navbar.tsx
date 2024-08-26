'use client'
import { ModeToggle } from "@/components/ModeToggle/mode-toggle";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Menu, User } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

export default function Navbar({ setSidebarOpen }: { setSidebarOpen: Dispatch<SetStateAction<boolean>> }) {
    const router = useRouter()

    const toggleSidebar = () => {
        setSidebarOpen(prevState => !prevState)
    }

    const handleLogout = async () => {
        await signOut({ redirect: false });
        router.push("/")
    }

    return (
        <header className="flex h-14 lg:h-[60px] items-center justify-between gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
            <Button className="lg:hidden" size="icon" variant="ghost" onClick={toggleSidebar}>
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Sidebar</span>
            </Button>
            <Button className="hidden lg:flex" size="icon" variant="ghost" onClick={toggleSidebar}>
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Sidebar</span>
            </Button>
            <div className='flex items-center gap-4'>
                <ModeToggle />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className="rounded-full" size="icon" variant="ghost">
                            <User className="h-4 w-4" />
                            <span className="sr-only">Toggle user menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Admin</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className='cursor-pointer' onClick={handleLogout}>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}