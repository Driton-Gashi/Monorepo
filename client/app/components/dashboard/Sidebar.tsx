"use client";
import NavLink from "../global/NavLink";
import { usePathname } from "next/navigation";

const Sidebar = ({ ...props }) => {
  const pathName = usePathname();
  const isDashboard = pathName == "/dashboard";
  const isDashboardFood =
    pathName == "/dashboard/food/all" ||
    pathName == "/dashboard/food/create" ||
    pathName.includes("dashboard/food/edit");
  return (
    <aside {...props}>
      <div className="flex flex-col justify-between h-full">
        <div className="flex-grow">
          <div className="h-16 text-center border-b flex items-center justify-center">
            <h1 className="text-xl font-bold leading-none">
              <span className="text-primary-red">Food Order</span> App
            </h1>
          </div>
          <div className="p-4">
            <ul className="space-y-1">
              <li>
                <NavLink
                  href="/dashboard"
                  className={`flex items-center bg-white ${
                    isDashboard
                      ? "[&.active]:bg-primary-red [&.active]:text-primary-white"
                      : ""
                  } hover:bg-primary-red hover:text-primary-white   rounded-xl font-bold text-sm  py-3 px-4`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 mr-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
                    />
                  </svg>
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  href="/dashboard/food/all"
                  className={`${
                    isDashboardFood
                      ? "active [&.active]:bg-primary-red ![&.active]:text-primary-white"
                      : ""
                  } flex items-center bg-white [&.active]:bg-primary-red hover:bg-primary-red hover:text-primary-white  rounded-xl font-bold text-sm [&.active]:text-primary-white py-3 px-4`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 mr-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                    />
                  </svg>
                  Foods
                </NavLink>
              </li>
              <li>
                <NavLink
                  href="/dashboard/profile"
                  className={`flex items-center bg-white [&.active]:bg-primary-red hover:bg-primary-red hover:text-primary-white  rounded-xl font-bold text-sm [&.active]:text-primary-white py-3 px-4`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 mr-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                  Profile
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="p-4">
          <button
            type="button"
            className="inline-flex items-center justify-center h-9 px-4 rounded-xl bg-gray-900 text-gray-300 hover:text-white text-sm font-semibold transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              fill="currentColor"
              className=""
              viewBox="0 0 16 16"
            >
              <path d="M12 1a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V2a1 1 0 0 1 1-1h8zm-2 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
            </svg>
          </button>
          <span className="font-bold text-sm ml-2">Logout</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
