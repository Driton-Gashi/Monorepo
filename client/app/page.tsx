"use client";
import { useState, useEffect } from "react";
import FoodCard from "./components/global/FoodCard";
import FoodCardSkeleton from "./components/global/FoodCardSkeleton";
import type { Food, categoryType, popupData } from "@/app/utils/types";
import Image from "next/image";
import { apiHandler } from "./utils/helpfulFunctions";
import QuickView from "./components/global/QuickView";
import Cart from "./components/cart/Cart";

interface errorType {
  foodError: string;
  categoryError: string;
}

export default function Home() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [allFoods, setAllFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<errorType>({
    foodError: "",
    categoryError: "",
  });
  const [categories, setCategories] = useState<categoryType[]>([]);
  const [produktetNeShporte, setProduktetNeShporte] = useState<Food[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string | number>(
    "all"
  );
  const [popupData, setPopupData] = useState<popupData>({
    id: 0,
    imageSrc: "",
    name: "",
    price: 123,
    imageAlt: "",
    visible: false,
  });
  const [searchString, setSearchString] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [foodResponse, categoryResponse] = await Promise.all([
          fetch(apiHandler("/api/foods")),
          fetch(apiHandler("/api/categories")),
        ]);

        if (!foodResponse.ok) {
          setError((prevState) => ({
            ...prevState,
            foodError: "Failed to fetch foods. Please try again later.",
          }));
          throw new Error("Failed to fetch foods");
        }
        const foodData = await foodResponse.json();

        setFoods(foodData);
        setAllFoods(foodData);

        if (!categoryResponse.ok) {
          setError((prevState) => ({
            ...prevState,
            categoryError:
              "Failed to fetch categories. Please try again later.",
          }));
          throw new Error("Failed to fetch categories");
        }
        const categoryData = await categoryResponse.json();
        setCategories(categoryData);
      } catch (error) {
        console.error(error);
        setError({
          foodError: "An error occurred while fetching data.",
          categoryError: "An error occurred while fetching data.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const cartItems: Food[] = JSON.parse(
      localStorage.getItem("cartItems") || "[]"
    );

    setProduktetNeShporte(cartItems);
  }, []);

  const getFoodByCategory = async (id: number) => {
    const foodsByCategory = allFoods.filter((food) => food.category_id == id);
    setFoods(foodsByCategory);
  };

  useEffect(()=>{
    const searchFunction = () => {
      if (searchString == "") {
        setFoods(allFoods);
        setCurrentCategory("all");
        return;
      }
  
      const filtered = allFoods.filter(
        (food) =>
          food.name.toLowerCase().includes(searchString.toLowerCase()) ||
          food.price.toString().toLowerCase().includes(searchString.toLowerCase()) ||
          food.category_name?.toLowerCase().includes(searchString.toLowerCase())
      );

      setCurrentCategory("all");
      setFoods(filtered);
    };
    searchFunction();
  },[searchString, allFoods])

  return (
    <div className="container m-auto p-6">
      <Image
        priority
        className="rounded-3xl shadow w-full"
        src="/Banner_Pizza.jpg"
        alt="Pizza Banner"
        width={976}
        height={226}
      />
      <div className="flex pt-6 pb-6">
        <div className="w-2/3 p-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name, price, category..."
              className="border w-full p-4 rounded-lg text-sm bg-no-repeat"
              value={searchString}
              onChange={(e)=> setSearchString(e.target.value)}
            />
            <svg
            onClick={()=> setSearchString("")}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className={`size-4 absolute top-1/2 right-4 -translate-y-1/2 ${searchString ? "" : "hidden"} cursor-pointer`}
            >
              <path
                fillRule="evenodd"
                d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm2.78-4.22a.75.75 0 0 1-1.06 0L8 9.06l-1.72 1.72a.75.75 0 1 1-1.06-1.06L6.94 8 5.22 6.28a.75.75 0 0 1 1.06-1.06L8 6.94l1.72-1.72a.75.75 0 1 1 1.06 1.06L9.06 8l1.72 1.72a.75.75 0 0 1 0 1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="flex flex-wrap gap-2 py-4">
            {error.categoryError ? (
              `Couldn't get categories because: ${error.categoryError}`
            ) : (
              <>
                <button
                  className={`${
                    currentCategory == "all"
                      ? " bg-primary-red text-primary-white"
                      : "text-primary-red"
                  } py-2 px-4 rounded-3xl uppercase`}
                  onClick={() => {
                    setFoods(allFoods);
                    setCurrentCategory("all");
                  }}
                >
                  All
                </button>
                {categories.map((category) => (
                  <button
                    className={`${
                      currentCategory === category.id
                        ? "bg-primary-red text-primary-white"
                        : "text-primary-red"
                    } hover:bg-primary-red hover:text-primary-white py-2 px-4 rounded-3xl uppercase`}
                    onClick={() => {
                      getFoodByCategory(category.id);
                      setCurrentCategory(category.id);
                    }}
                    key={category.id}
                  >
                    {category.name}
                  </button>
                ))}
              </>
            )}
          </div>
          {error.foodError ? (
            `Couldn't get foods because: ${error.foodError}`
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
                  food_id={food.food_id}
                  name={food.name}
                  price={food.price}
                  image_url={food.image_url}
                  key={food.food_id}
                  setPopupData={setPopupData}
                />
              ))}
            </div>
          )}
        </div>
        <div className="w-1/3 p-6">
          <div className="border-2 border-primary-red rounded-2xl p-6">
            <div className="flex justify-between">
              <h2 className="text-primary-red text-xl font-bold">Porosia Juaj</h2>
              <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="#eb2327"
          className="size-12 "
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
          />
        </svg>
            </div>
            <Cart
              setProduktetNeShporte={setProduktetNeShporte}
              produktetNeShporte={produktetNeShporte}
            />
          </div>
        </div>
      </div>
      <QuickView
        produktetNeShporte={produktetNeShporte}
        setProduktetNeShporte={setProduktetNeShporte}
        popupData={popupData}
        setPopupData={setPopupData}
      />
    </div>
  );
}
