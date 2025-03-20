"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface P {
    id?: number;
  deleteFunction: () => void;
}

const ActionDropdown = ({ deleteFunction, id }: P) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        id="dropdownMenuIconButton"
        data-dropdown-toggle="dropdownDots"
        className="border inline-flex items-center p-2 text-sm font-medium text-center text-primary-black bg-white rounded-full"
        type="button"
      >
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="#374151"
          viewBox="0 0 4 15"
        >
          <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
        </svg>
      </button>

      <div
        id="dropdownDots"
        className={`${
          isDropdownVisible ? "block" : "hidden"
        } z-10 absolute right-0 mt-1 bg-white divide-y shadow-md border rounded-lg`}
      >
        <ul
          className="text-sm text-gray-700"
          aria-labelledby="dropdownMenuIconButton"
        >
          <li>
            <div
              className="block cursor-pointer text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              onClick={deleteFunction}
            >
              Delete
            </div>
          </li>
          <li>
            <Link
              href={`/dashboard/food/edit/${id}`}
              className="block cursor-pointer text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Edit
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ActionDropdown;