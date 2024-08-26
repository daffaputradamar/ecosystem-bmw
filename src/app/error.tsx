'use client'
import Link from "next/link"

function TriangleAlertIcon(props: any) {
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
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  )
}

export default function Error() {
  return (
    <div className="flex flex-col items-center flex-grow justify-center mt-32">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-500 text-white text-4xl font-bold mb-4">
          <TriangleAlertIcon className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">Error</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md">
          Oops, something went wrong. We&apos;re working on it and will have it fixed as soon as possible.
        </p>
        <Link
          className="inline-flex items-center justify-center h-10 px-6 rounded-md bg-gray-900 text-gray-50 font-medium transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
          href="/"
        >
          Go back home
        </Link>
      </div>
    </div>
  )
}