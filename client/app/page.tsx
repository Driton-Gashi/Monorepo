"use client";
import { useUser } from "./context/UserContext";
import { useState, useEffect } from "react";
import FoodCard from "./components/global/FoodCard";
import FoodCardSkeleton from "./components/global/FoodCardSkeleton";

interface Food {
  food_id: number;
  name: string;
  price: number;
  category: string;
  image_url: string;
}

export default function Home() {
  const { loggedInUserData } = useUser();
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/food`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch foods");
        }
        const data = await response.json();
        setFoods(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  return (
    <div className="container m-auto p-6">
      <img
        className="rounded-3xl shadow"
        width="100%"
        src="/Banner_Pizza.jpg"
        alt=""
      />
      <div className="flex pt-6 pb-6">
        <div className="w-2/3 p-6">
          <input
            type="text"
            placeholder="Search..."
            className="border w-full p-4 rounded-lg text-sm bg-no-repeat p"
          />
          <div className="flex flex-wrap gap-2 p-4">
            <button>Category</button>
            <button>Category</button>
            <button>Category</button>
            <button>Category</button>
            <button>Category</button>
            <button>Category</button>
            <button>Category</button>
            <button>Category</button>
            <button>Category</button>
          </div>
          {loading ? (
            <div className="flex flex-wrap gap-[8%]">
            <FoodCardSkeleton/>
            <FoodCardSkeleton/>
            <FoodCardSkeleton/>
            </div>
          ) : (
            <div className="flex flex-wrap gap-[8%]">
              {foods.map((food) => (
                <FoodCard className="w-1/4" name={food.name} price={food.price} imageUrl={food.image_url} key={food.food_id}/>
              ))}
            </div>
          )}
        </div>
        <div className="w-1/3 p-6">
          <div className="border-2 border-red-700 rounded-2xl p-6">
            <div className="flex justify-between">
              <h2 className="text-red-600 text-xl font-bold">Porosia Juaj</h2>{" "}
              <img width="50px" src="/cart.png" alt="" />
            </div>
            <img className="m-auto mt-10 mb-10" src="/box.png" alt="" />
            <h4 className="text-center mb-6">Ska produkte ne shporte</h4>
            <hr className="w-20 m-auto border-black" />
            <h2 className="mt-6 text-center text-2xl">Porosia Minimale</h2>
            <h2 className="mt-2 text-center text-2xl">5 euro</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
