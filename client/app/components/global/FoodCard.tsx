import Image from "next/image";
import type { Food } from "@/app/utils/types";
import { Dispatch, SetStateAction } from "react";

interface foodCard extends Food {
  setProduktetNeShporte: Dispatch<SetStateAction<Food[]>>;
}

const FoodCard = ({ name, image_url, price, className, food_id, setProduktetNeShporte }: foodCard) => {
  const addToCartArray = (food: Food) => {
    setProduktetNeShporte((prevState) => [...prevState, food]);

    // Ensure cartItems exists in localStorage
    if (!localStorage.getItem("cartItems")) {
      localStorage.setItem("cartItems", JSON.stringify([]));
    }

    // Retrieve cart items safely
    const cartItems: Food[] = JSON.parse(localStorage.getItem("cartItems") || "[]");
    
    cartItems.push(food);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  const addToCart = (): void => {
    console.log(food_id);
    
    const food: Food = { food_id, name, price, image_url };

    addToCartArray(food);
  };

  return (
    <div className={className}>
      <Image
        width={120}
        height={120}
        className="h-32"
        src={`https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${image_url}`}
        loading="eager"
        alt=""
        priority
      />
      <h2>{name}</h2>
      <h2 className="text-red-600 font-bold my-2">{price}€</h2>
      <button
        onClick={addToCart}
        className="py-2 w-full tex-sm text-red-600 rounded-3xl bg-transparent border-2 border-red-600 transition-colors hover:bg-red-600 hover:text-white"
      >
        Shto ne Shporte
      </button>
    </div>
  );
};

export default FoodCard;
