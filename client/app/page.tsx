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
      <div className="flex pt-6 pb-6 gap-6">
        <div className="w-full lg:w-3/5 py-6">
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
        <div className="w-full lg:w-2/5 py-6">
          <Cart produktetNeShporte={produktetNeShporte} setProduktetNeShporte={setProduktetNeShporte}/>
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
