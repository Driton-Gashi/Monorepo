"use client";
import { useState, useEffect } from "react";
import type { Food, popupData } from "@/app/utils/types";
import Image from "next/image";
import { apiHandler } from "./utils/helpfulFunctions";
import QuickView from "./components/global/QuickView";
import Cart from "./components/cart/Cart";
import SearchInput from "./components/home/SearchInput";
import CategoryFilter from "./components/home/CategoryFilter";
import FoodList from "./components/home/FoodList";

export default function Home() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [allFoods, setAllFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
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
        const foodResponse = await fetch(apiHandler("/api/foods"));
        if (!foodResponse.ok) {
          throw new Error("Failed to fetch foods");
        }
        const foodData = await foodResponse.json();
        setFoods(foodData);
        setAllFoods(foodData);
      } catch (error) {
        console.error(error);
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
          <SearchInput
            allFoods={allFoods}
            setCurrentCategory={setCurrentCategory}
            setFoods={setFoods}
          />
          <div className="flex flex-wrap gap-2 py-4">
            <CategoryFilter
              allFoods={allFoods}
              currentCategory={currentCategory}
              setCurrentCategory={setCurrentCategory}
              setFoods={setFoods}
            />
          </div>
          <FoodList foods={foods} loading={loading} setPopupData={setPopupData}/>
        </div>
        <div className="w-1/3 p-6">
          <div className="border-2 border-primary-red rounded-2xl p-6">
            <div className="flex justify-between">
              <h2 className="text-primary-red text-xl font-bold">
                Porosia Juaj
              </h2>
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
