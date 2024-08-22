'use client'

import LogoIcon from '@/components/icons/logo';
import { ModeToggle } from '@/components/ModeToggle/mode-toggle';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Package, Users, Search, Bell, User, Home, ShoppingCart, BarChart, Settings, HelpCircle, ChevronDown, Menu } from 'lucide-react'
import Link from 'next/link';
import { useState } from 'react';


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const [openMenus, setOpenMenus] = useState({
        products: true,
        users: false,
    })
    const [sidebarOpen, setSidebarOpen] = useState(true)

    const toggleMenu = (menu: string) => {
        setOpenMenus(prevState => ({
            ...prevState,
            [menu]: !prevState[menu]
        }))
    }

    const toggleSidebar = () => {
        setSidebarOpen(prevState => !prevState)
    }

    return (
        <div className="grid min-h-screen w-full grid-cols-[auto_1fr]">
            <aside className={`${sidebarOpen ? 'w-64' : 'w-[60px]'} block lg:block transition-all duration-300 ease-in-out`}>
                <div className={`fixed top-0 left-0 h-full bg-gray-100/40 dark:bg-gray-800/40 border-r ${sidebarOpen ? 'w-64' : 'w-[60px]'} transition-all duration-300 ease-in-out overflow-hidden`}>
                    <div className="flex h-full flex-col gap-2">
                        <div className="flex h-[60px] items-center border-b px-6">
                            <Link className="flex items-center gap-2 font-semibold" href="#">
                                <LogoIcon className="h-6 w-6 text-primary" />
                                {sidebarOpen && <span className="">Ecosystem BMW</span>}
                            </Link>
                        </div>
                        <nav className="grid items-start px-4 text-sm font-medium">
                            <Link
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                                href="#"
                            >
                                <Home className="h-4 w-4" />
                                {sidebarOpen && <span>Dashboard (En Route)</span>}
                            </Link>
                            <div>
                                <button
                                    className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-gray-500 transition-all hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700"
                                    onClick={() => toggleMenu('products')}
                                >
                                    <div className="flex items-center gap-3">
                                        <Package className="h-4 w-4" />
                                        {sidebarOpen && <span>Products</span>}
                                    </div>
                                    {sidebarOpen && <ChevronDown className={`h-4 w-4 transition-transform ${openMenus.products ? 'rotate-180' : ''}`} />}
                                </button>
                                {sidebarOpen && openMenus.products && (
                                    <div className="ml-4 mt-2 grid gap-1">
                                        <Link
                                            className="rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                                            href="/admin/products"
                                        >
                                            All Products
                                        </Link>
                                        <Link
                                            className="rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                                            href="/admin/products/create"
                                        >
                                            Add New Product
                                        </Link>
                                    </div>
                                )}
                            </div>
                            <Link
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                                href="#"
                            >
                                <Users className="h-4 w-4" />
                                {sidebarOpen && <span>Users</span>}
                            </Link>
                            <Link
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                                href="#"
                            >
                                <ShoppingCart className="h-4 w-4" />
                                {sidebarOpen && <span>Orders (En Route)</span>}
                            </Link>
                            <Link
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                                href="#"
                            >
                                <BarChart className="h-4 w-4" />
                                {sidebarOpen && <span>Analytics (En Route)</span>}
                            </Link>
                            <Link
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                                href="#"
                            >
                                <Settings className="h-4 w-4" />
                                {sidebarOpen && <span>Settings (En Route)</span>}
                            </Link>
                            <Link
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                                href="#"
                            >
                                <HelpCircle className="h-4 w-4" />
                                {sidebarOpen && <span>Help & Support (En Route)</span>}
                            </Link>
                        </nav>
                    </div>
                </div>
            </aside>
            <div className="flex flex-col">

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
                                <DropdownMenuItem>Logout</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>
                <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
