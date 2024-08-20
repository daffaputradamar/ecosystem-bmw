import Link from "next/link"
import { ModeToggle } from "@/components/ModeToggle/mode-toggle"
import LogoIcon from "../icons/logo"

export default function Footer() {
  return (
    <footer className="p-6 md:p-12 w-full">
      <div className="container max-w-7xl flex flex-col items-center gap-6 md:flex-row md:justify-between">
        <Link className="flex items-center gap-2" href="#">
          <LogoIcon className="h-6 w-6 text-primary" />
          <span className="text-sm font-medium">Ecosystem BMW</span>
        </Link>
        <div className="flex">
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <p>© {new Date().getFullYear()} All rights reserved.</p>
            <ModeToggle />
          </div>
        </div>
      </div>
    </footer>
  )
}
