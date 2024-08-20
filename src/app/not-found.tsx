import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center mt-48">
      <div className="text-center space-y-6">
        <h1 className="text-9xl font-bold text-gray-400 dark:text-gray-200">404</h1>
        <p className="text-2xl font-medium text-gray-600 dark:text-gray-400">
          Oops, the page you&apos;re looking for doesn&apos;t exist.
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