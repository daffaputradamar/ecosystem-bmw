import Link from "next/link"
import { ModeToggle } from "@/components/ModeToggle/mode-toggle"
import LogoIcon from "../icons/logo"

export default function Footer() {
  return (
    <footer className="p-6 md:p-12 w-full">
      <div className="container max-w-7xl flex items-center gap-6 md:justify-between">
        <Link className="hidden md:flex items-center gap-2" href="#">
          <LogoIcon className="h-6 w-6 text-primary" />
          <span className="text-sm font-medium">Ecosystem BMW</span>
        </Link>
        <div className="flex-1 flex items-center justify-between md:justify-end gap-4 text-sm text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} All rights reserved.</p>
          <ModeToggle />
        </div>
      </div>
    </footer>
  )
}
