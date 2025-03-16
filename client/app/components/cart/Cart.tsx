import type { Food } from "@/app/utils/types";
import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import CartItem from "./CartItem";
import { totalPrice } from "@/app/utils/helpfulFunctions";
import { useEffect } from "react";

interface P{
    produktetNeShporte: Food[];
    setProduktetNeShporte:  Dispatch<SetStateAction<Food[]>>;
}

  const Cart = ({ produktetNeShporte, setProduktetNeShporte}:P) => {

    const removeFromCart = (id: number) => {
        setProduktetNeShporte((prevState) =>
          prevState.filter((item) => item.food_id !== id) 
        );
      };

      useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(produktetNeShporte));
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
          <h2 className="mt-6 text-center text-2xl">Porosia Minimale</h2>
          <h2 className="mt-2 text-center text-2xl">5 euro</h2>
        </>
      );
    }
    return (
      <>
        {produktetNeShporte.map((food: Food) => (
         <CartItem produktetNeShporte={produktetNeShporte} setProduktetNeShporte={setProduktetNeShporte} food={food} removeFromCart={removeFromCart} key={food.food_id}/>
        ))}
        <hr className="w-full mx-auto my-2 border-gray-300" />
        <div>Sub-total: {totalPrice(produktetNeShporte)}</div>
      </>
    );
  };

export default Cart