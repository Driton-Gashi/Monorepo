import Link from "next/link"

const Header = ({...props}) => {
  return (
    <header {...props}>
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/" className="flex items-center focus:outline-none rounded-lg text-primary-black hover:text-primary-red focus:text-primary-red font-semibold p-2 border border-transparent hover:border-red-300 focus:border-red-300 transition">
            <span className="inline-flex items-center justify-center w-6 h-6 text-primary-black text-xs rounded bg-primary-white transition mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
              </svg>
            </span>
            <span className="text-sm">Go Back</span>
          </Link>
        </div>
        <Link href="/dashboard" className="text-lg font-bold">Dashboard</Link>
        <div>
        <div title="I'm unavaliable" className="flex items-center focus:outline-none rounded-lg text-primary-black hover:text-primary-red focus:text-primary-red font-semibold p-2 border border-transparent hover:border-red-300 focus:border-red-300 transition">
            <span className="inline-flex items-center justify-center w-6 h-6 text-primary-black text-xs rounded bg-primary-white transition mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
              </svg>
            </span>
            <span className="text-sm">Don&apos;t Click</span>
          </div>
        </div>
      </div>
    </div>
  </header>
  )
}

export default Header