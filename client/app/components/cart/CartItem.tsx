"use client"
import Image from "next/image";
import type { Food } from "@/app/utils/types";
import { Dispatch, SetStateAction } from "react";
import { useEffect } from "react";

interface P {
  removeFromCart: (id: number) => void;
  food: Food;
  setProduktetNeShporte: Dispatch<SetStateAction<Food[]>>;
  produktetNeShporte: Food[];
}

const CartItem = ({ removeFromCart, food, setProduktetNeShporte, produktetNeShporte }: P) => {


  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(produktetNeShporte));
  }, [produktetNeShporte]);

  const decreaseQuantity = () => {
    setProduktetNeShporte((prevData) =>
      prevData
        .map((item) => {
          if (item.food_id === food.food_id) {
            const newQuantity = item.quantity ? item.quantity - 1 : 0;
            return { ...item, quantity: newQuantity };
          }
          return item;
        })
        .filter((item) => item.quantity && item.quantity > 0)
    );
  };

  return (
    <div className="mt-2 flex gap-2 relative pt-6">
      <div
        onClick={() => removeFromCart(food.food_id ?? 0)}
        className="absolute top-0 right-0 cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
  <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm2.78-4.22a.75.75 0 0 1-1.06 0L8 9.06l-1.72 1.72a.75.75 0 1 1-1.06-1.06L6.94 8 5.22 6.28a.75.75 0 0 1 1.06-1.06L8 6.94l1.72-1.72a.75.75 0 1 1 1.06 1.06L9.06 8l1.72 1.72a.75.75 0 0 1 0 1.06Z" clipRule="evenodd" />
</svg>

      </div>
      <Image
        priority
        width={50}
        height={50}
        alt=""
        src={`https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${food.image_url}`}
      />
      <div className="relative w-full ">
        <h2 className="text-sm">{food.name}</h2>
        <p className="text-sm">
          {food.quantity}X {food.price}€
        </p>
        <div className="flex absolute top-1/2 right-0 -translate-y-1/2 gap-1">
          <span onClick={decreaseQuantity} className="border border-red-700 text-red-700 w-6 h-6 flex justify-center items-center rounded-full cursor-pointer">
            -
          </span>
          <span className="border bg-red-700 text-white w-6 h-6 flex justify-center items-center rounded-full cursor-pointer">
            +
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
