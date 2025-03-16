"use client";

import type { Food } from "@/app/utils/types";
import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import CartItem from "./CartItem";
import { totalPrice } from "@/app/utils/helpfulFunctions";
import { useEffect } from "react";
import Link from "next/link";

interface P {
  produktetNeShporte: Food[];
  setProduktetNeShporte: Dispatch<SetStateAction<Food[]>>;
  triggerFormSubmit?:()=> void;
}

const Cart = ({ produktetNeShporte, setProduktetNeShporte, triggerFormSubmit }: P) => {

  const removeFromCart = (id: number) => {
    setProduktetNeShporte((prevState) =>
      prevState.filter((item) => item.food_id !== id)
    );
  };

  useEffect(() => {
    const cartItems = localStorage.getItem("cartItems");
    if (cartItems && cartItems.length > 0) {
      setProduktetNeShporte(JSON.parse(cartItems));
    }
  }, [setProduktetNeShporte]);

  useEffect(() => {
    if (produktetNeShporte.length > 0) {
      localStorage.setItem("cartItems", JSON.stringify(produktetNeShporte));
    }
  }, [produktetNeShporte]);

  if (!produktetNeShporte.length) {
    return (
      <>
        <Image
          className="m-auto mt-10 mb-10"
          src="/box.png"
          alt="Empty Cart"
          width={100}
          height={100}
        />
        <h4 className="text-center mb-6">Ska produkte ne shporte</h4>
        <hr className="w-20 m-auto border-black" />
        {triggerFormSubmit?<Link
          href="/"
          className="text-center block w-full rounded-full bg-red-500 text-white p-2 mt-2 hover:bg-red-600"
        >
          Back to Menu
        </Link>:<>
        <h2 className="mt-6 text-center text-2xl">Porosia Minimale</h2>
        <h2 className="mt-2 text-center text-2xl">5 euro</h2></>}
        
      </>
    );
  }
  return (
    <>
      {produktetNeShporte.map((food: Food) => (
        <CartItem
          setProduktetNeShporte={setProduktetNeShporte}
          food={food}
          removeFromCart={removeFromCart}
          key={food.food_id}
        />
      ))}
      <hr className="w-full mx-auto my-2 border-gray-300" />
      <div>Sub-total: {totalPrice(produktetNeShporte)}€</div>
      {triggerFormSubmit ? (
        <div
          onClick={triggerFormSubmit}
          className="cursor-pointer text-center block w-full rounded-full bg-red-500 text-white p-2 mt-2 hover:bg-red-600"
        >
          Continue
        </div>
      ) : (
        <Link
          href="/checkout"
          className="text-center block w-full rounded-full bg-red-500 text-white p-2 mt-2 hover:bg-red-600"
        >
          Continue
        </Link>
      )}
    </>
  );
};

export default Cart;
