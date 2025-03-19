"use client";

import type { Food } from "../utils/types";
import { useState, useRef } from "react";
import Cart from "../components/cart/Cart";
import Image from "next/image";


const CheckoutPage = () => {
  const [produktetNeShporte, setProduktetNeShporte] = useState<Food[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    console.log("Hello World")
  }

  const triggerFormSubmit = () => {
    if (formRef.current) {
      
      const hiddenSubmitButton = formRef.current.querySelector(
        "button[type='submit']"
      ) as HTMLButtonElement;

      if (hiddenSubmitButton) {
        hiddenSubmitButton.click();
      }
    }
  };

  return (
    <div className="container m-auto px-6">
        <div className="flex justify-center gap-6 items-start">
      <form onSubmit={handleSubmit} ref={formRef} className="w-full">
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-black"
          >
            Name
          </label>
          <input
            type="name"
            id="name"
            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        
        <div className="mb-5">
          <label
            htmlFor="address"
            className="block mb-2 text-sm font-medium text-black"
          >
            Address
          </label>
          <input
            type="address"
            id="address"
            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="city"
            className="block mb-2 text-sm font-medium text-black"
          >
            City
          </label>
          <input
            type="city"
            id="city"
            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="phone"
            className="block mb-2 text-sm font-medium text-black"
          >
            Phone
          </label>
          <input
            type="phone"
            id="phone"
            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-black"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="extra"
            className="block mb-2 text-sm font-medium text-black"
          >
            Extra
          </label>
          <textarea
            id="extra"
            className="min-h-24 bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="hidden"
        >
          invisible Submit Button :)
        </button>
      </form>
      <div className="border-2 border-red-700 rounded-2xl p-6 w-full">
        <div className="flex justify-between">
          <h2 className="text-red-600 text-xl font-bold">Porosia Juaj</h2>
          <Image width={50} height={50} src="/cart.png" alt="Shopping Cart" />
        </div>
        <Cart
          setProduktetNeShporte={setProduktetNeShporte}
          produktetNeShporte={produktetNeShporte}
          triggerFormSubmit={triggerFormSubmit}
        />
      </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
