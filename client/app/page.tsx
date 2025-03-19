"use client";
import { useState, useEffect } from "react";
import FoodCard from "./components/global/FoodCard";
import FoodCardSkeleton from "./components/global/FoodCardSkeleton";
import type { Food, categoryType, popupData } from "@/app/utils/types";
import Image from "next/image";
import { apiHandler} from "./utils/helpfulFunctions";
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
          <input
            type="text"
            placeholder="Search..."
            className="border w-full p-4 rounded-lg text-sm bg-no-repeat"
          />
          <div className="flex flex-wrap gap-2 py-4">
            {error.categoryError ? (
              `Couldn't get categories because: ${error.categoryError}`
            ) : (
              <>
                <button
                  className={`${
                    currentCategory == "all"
                      ? " bg-red-500 text-white"
                      : "text-red-500"
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
                        ? "bg-red-500 text-white"
                        : "text-red-500"
                    } hover:bg-red-500 hover:text-white py-2 px-4 rounded-3xl uppercase`}
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
          <div className="border-2 border-red-700 rounded-2xl p-6">
            <div className="flex justify-between">
              <h2 className="text-red-600 text-xl font-bold">Porosia Juaj</h2>
              <Image
                width={50}
                height={50}
                src="/cart.png"
                alt="Shopping Cart"
              />
            </div>
            <Cart setProduktetNeShporte={setProduktetNeShporte} produktetNeShporte={produktetNeShporte} />
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
