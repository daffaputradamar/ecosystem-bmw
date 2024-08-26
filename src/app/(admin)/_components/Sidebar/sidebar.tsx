'use client'

import LogoIcon from "@/components/icons/logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronDown, InfoIcon, Package, Users } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Dispatch, SetStateAction, useState } from "react"

export default function Sidebar({ menus, sidebarOpen, setSidebarOpen }: { menus: any[], sidebarOpen: boolean, setSidebarOpen: Dispatch<SetStateAction<boolean>> }) {
    const router = useRouter()
    
    const [openMenus, setOpenMenus] = useState({
        products: true,
        users: false,
    })
    const pathname = usePathname();
    const [searchQuery, setSearchQuery] = useState('');

    const filteredMenus = menus.map(menu => ({
        ...menu,
        children: menu.children?.filter((child: any) => child.name.toLowerCase().includes(searchQuery.toLowerCase())) || [],
    })).filter(menu => menu.name.toLowerCase().includes(searchQuery.toLowerCase()) || menu.children.length > 0);


    const toggleMenu = (menu: 'products' | 'users') => {
        setOpenMenus(prevState => ({
            ...prevState,
            [menu]: !prevState[menu]
        }))
    }

    const handleNavigation = (path: string) => {
        // console.log(window.innerWidth);
        
        // if (window.innerWidth < 768) {
        //     setSidebarOpen(false);
        // }
        router.push(path);
    };

    return (
        <aside className={`${sidebarOpen ? 'w-64' : 'w-[60px]'} block lg:block transition-all duration-300 ease-in-out`}>
            <div className={`fixed top-0 left-0 h-full bg-gray-100/40 dark:bg-gray-800/40 border-r ${sidebarOpen ? 'w-64' : 'w-[60px]'} transition-all duration-300 ease-in-out overflow-hidden`}>
                <div className="flex h-full flex-col gap-2">
                    <div className="flex h-[60px] items-center border-b px-6">
                        {
                            sidebarOpen &&

                            <Link className="flex items-center gap-2 font-semibold" href="/">
                                <LogoIcon className="h-20 w-20 text-primary" />
                                <span className="sr-only">Ecosystem BMW</span>
                            </Link>
                        }
                    </div>
                    {
                        sidebarOpen &&
                        <div className="px-4 py-2">
                            <Input
                                placeholder="Search..."
                                className="w-full rounded-lg text-sm border focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    }
                    <nav className="grid items-start px-4 text-sm font-medium">
                        {
                            filteredMenus.map((menu, index) => {
                                let isActive = pathname === menu.path;

                                if (menu.children && menu.children.length > 0) {

                                    return (
                                        <>
                                            <button
                                                className="flex w-full items-center justify-between rounded-lg px-3 py-2 transition-all hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-400"
                                                onClick={() => toggleMenu('products')}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <Package className="h-4 w-4" />
                                                    {sidebarOpen && <span>Products</span>}
                                                </div>
                                                {sidebarOpen && <ChevronDown className={`h-4 w-4 transition-transform ${openMenus.products ? 'rotate-180' : ''}`} />}
                                            </button>
                                            {sidebarOpen && openMenus.products &&
                                            <div className="ml-4 mt-2 grid gap-1">
                                                { menu.children.map((child: any, index: number) => {
                                                    isActive = pathname === child.path;
                                                    return (
                                                        <div
                                                            key={index}
                                                            className={`rounded-lg px-3 py-2 transition-all ${isActive
                                                                ? 'text-primary' // Active styles
                                                                : 'hover:text-gray-900 dark:hover:text-gray-50'}`}
                                                            onClick={() => handleNavigation(child.path)}
                                                        >
                                                            {/* <div className="flex md:hidden absolute inset-0 -z-10" onClick={() => setSidebarOpen(false)}>
                                                            </div> */}
                                                            {child.name}
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                            }
                                                
                                        </>
                                    )
                                } else {
                                    return (
                                        <div
                                            key={index}
                                            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${isActive
                                                ? 'text-primary' // Active styles
                                                : 'hover:text-gray-900 dark:hover:text-gray-50'}`}
                                            onClick={() => handleNavigation(menu.path)}
                                        >
                                            {/* <div className="flex md:hidden absolute inset-0 z-10" onClick={() => setSidebarOpen(false)}>
                                            </div> */}
                                            {menu.icon && <menu.icon className="w-4 h-4" />}
                                            {sidebarOpen && <span>{menu.name}</span>}
                                        </div>
                                    )
                                }
                            })
                        }
                    </nav>
                </div>
            </div>
        </aside>
    )
}