'use client'

import Sidebar from './_components/Sidebar/sidebar';
import Navbar from './_components/Navbar/navbar';
import { CirclePlus, InfoIcon, Library, Package, Users } from 'lucide-react';
import { useState } from 'react';


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [sidebarOpen, setSidebarOpen] = useState(true)
    
    const menus = [
        {
            name: 'About',
            path: '/admin',
            icon: InfoIcon
        },
        {
            name: 'Products',
            icon: Package,
            children: [
                {
                    name: 'All Products',
                    icon: Library,
                    path: '/admin/products'
                },
                {
                    name: 'Add New Product',
                    icon: CirclePlus,
                    path: '/admin/products/create'
                }
            ]
        },
        {
            name: 'Users',
            icon: Users,
            children: [
                {
                    name: 'All Users',
                    icon: Library,
                    path: '/admin/users'
                },
                {
                    name: 'Add New User',
                    icon: CirclePlus,
                    path: '/admin/users/create'
                }
            ]
        }
    ]

    return (
        <div className="grid min-h-screen w-full grid-cols-[auto_1fr]">
            <Sidebar menus={menus} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="flex flex-col">

                <Navbar setSidebarOpen={setSidebarOpen} />
                <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
                    <div className="md:container md:mx-auto py-10">
                    {children}
                    </div>
                </main>
            </div>
        </div>
    );
}``
