"use client";
import { useUser } from "./context/UserContext";
import { useState, useEffect } from "react";
import FoodCard from "./components/global/FoodCard";
import FoodCardSkeleton from "./components/global/FoodCardSkeleton";
import type {Food, categoryType} from "@/app/utils/types"

export default function Home() {
  const { loggedInUserData } = useUser();
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState({
    foodError: "",
    categoryError: "",
  });
  const [categories, setCategories] = useState<categoryType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/food`
        );
        const responseCategories = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`)
        if (!response.ok) {
          setError((prevState)=>(
            {
              ...prevState,
              foodError: "Failed to fetch foods"
            }
          ));
          throw new Error("Failed to fetch foods");
          
        }
        if(!responseCategories.ok){
          setError((prevState)=>(
            {
              ...prevState,
              categoryError: "Failed to fetch foods"
            }));
          throw new Error("Failed to fetch Categories");
        }

        const data = await response.json();
        const data2 = await responseCategories.json();
        setCategories(data2)
        setFoods(data);
      } catch (error) {
        console.error(error);
       setError(
        {
          foodError: error as string,
          categoryError: error as string,
        }
       )
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
          <div className="flex flex-wrap gap-2 py-4">
           {error.categoryError ?
           `Couldn't get categories because: ${error.categoryError}`
           : 
            categories.map((category)=>(
              <button key={category.id}>
                {category.name}
              </button>
            ))
          }
          </div>
          {error.foodError ? (
            "Couldn't get Foods because: "+error.foodError
          ) : loading ? (
            <div className="flex flex-wrap gap-[8%]">
              <FoodCardSkeleton />
              <FoodCardSkeleton />
              <FoodCardSkeleton />
            </div>
          ) : (
            <div className="flex flex-wrap gap-[8%]">
              {foods.map((food) => (
                <FoodCard
                  className="w-1/4"
                  id={food.food_id}
                  name={food.name}
                  price={food.price}
                  imageUrl={food.image_url}
                  key={food.food_id}
                />
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
