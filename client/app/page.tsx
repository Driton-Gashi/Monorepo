"use client";
import { useUser } from "./context/UserContext";
import { useState, useEffect } from "react";
import FoodCard from "./components/FoodCard";

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
            <div
              role="status"
              className="space-y-8 animate-pulse w-1/3 rtl:space-x-reverse"
            >
              <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded-sm  dark:bg-gray-700">
                <svg
                  className="w-10 h-10 text-gray-200 dark:text-gray-600"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                </svg>
              </div>
              <div className="w-full">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[80px] mb-4"></div>
                <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2.5"></div>
              </div>
              <span className="sr-only">Loading...</span>
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
