"use client";
import type { Food } from "@/app/utils/types";
import CartItem from "./CartItem";
import { totalPrice } from "@/app/utils/helpfulFunctions";
import Link from "next/link";
import { useCart } from "@/app/hooks/useCart";

interface P {
  triggerFormSubmit?: () => void;
}

const CartLogic = ({ triggerFormSubmit }: P) => {
  const produktetNeShporte = useCart((state) => state.produktetNeShporte);
  const removeItem = useCart((state) => state.removeFromCart);

  const removeFromCart = (id: number) => {
    removeItem(id);
  };

  if (!produktetNeShporte.length) {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="lightgray"
          className="size-28 m-auto"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 7.5-2.25-1.313M21 7.5v2.25m0-2.25-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3 2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75 2.25-1.313M12 21.75V19.5m0 2.25-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25"
          />
        </svg>
        <h4 className="text-center mb-6">Ska produkte ne shporte</h4>
        <hr className="w-20 m-auto border-black" />
        {triggerFormSubmit ? (
          <Link
            href="/"
            className="text-center block w-full rounded-full bg-primary-red text-primary-white p-2 mt-2 hover:bg-primary-red"
          >
            Back to Menu
          </Link>
        ) : (
          <>
            <h2 className="mt-6 text-center text-2xl">Porosia Minimale</h2>
            <h2 className="mt-2 text-center text-2xl">5 euro</h2>
          </>
        )}
      </>
    );
  }

  return (
    <>
      {produktetNeShporte.map((food: Food) => (
        <CartItem
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
          className="cursor-pointer text-center block w-full rounded-full bg-primary-red text-primary-white p-2 mt-2 hover:bg-primary-red"
        >
          Continue
        </div>
      ) : (
        <Link
          href="/checkout"
          className="text-center block w-full rounded-full bg-primary-red text-primary-white p-2 mt-2 hover:bg-primary-red"
        >
          Continue
        </Link>
      )}
    </>
  );
};

export default CartLogic;
