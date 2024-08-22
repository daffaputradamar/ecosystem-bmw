import { cn } from "@/lib/utils"

const Loading = () => {
  return (
    <div className="flex items-center justify-center mt-64">
      {/* <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-200 border-t-gray-600 border-b-gray-600"></div> */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("animate-spin", 'h-12 w-12 text-primary')}
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
    </div>
  )
}

export default Loading