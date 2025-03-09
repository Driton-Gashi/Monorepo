"use client"
import NavLink from "../global/NavLink"
import { usePathname } from "next/navigation";
import Image from "next/image";

const Sidebar = ({...props}) => {
  const isDashboard = usePathname() == "/dashboard";
  return (
    <aside {...props}>
    <div className="flex flex-col justify-between h-full">
      <div className="flex-grow">
        <div className="h-16 text-center border-b flex items-center justify-center">
          <h1 className="text-xl font-bold leading-none"><span className="text-red-700">Food Order</span> App</h1>
        </div>
        <div className="p-4">
          <ul className="space-y-1">
          <li>
              <NavLink href="/dashboard" className={`flex items-center bg-white ${isDashboard ?'[&.active]:bg-red-100':''} hover:bg-red-100  rounded-xl font-bold text-sm [&.active]:text-red-900 py-3 px-4`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" className="text-lg mr-4" viewBox="0 0 16 16">
                  <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-3.5-7h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5z"/>
                </svg>Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink href="/dashboard/food/all" className="flex items-center bg-white [&.active]:bg-red-100 hover:bg-red-100  rounded-xl font-bold text-sm [&.active]:text-red-900 py-3 px-4">
                <Image className="mr-4" alt="" src="https://www.svgrepo.com/show/491915/food-color-pizza-slice.svg" width={20} height={20}/>
                Foods
              </NavLink>
            </li>
           
          </ul>
        </div>
      </div>
      <div className="p-4">
        <button type="button" className="inline-flex items-center justify-center h-9 px-4 rounded-xl bg-gray-900 text-gray-300 hover:text-white text-sm font-semibold transition">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" className="" viewBox="0 0 16 16">
            <path d="M12 1a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V2a1 1 0 0 1 1-1h8zm-2 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
          </svg>
        </button> <span className="font-bold text-sm ml-2">Logout</span>
      </div>
    </div>
  </aside>
  )
}

export default Sidebar