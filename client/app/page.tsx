"use client";
import { useState, useEffect } from "react";
import type { Food, popupData } from "@/app/utils/types";
import Image from "next/image";
import { apiHandler } from "./utils/helpfulFunctions";
import QuickView from "./components/global/QuickView";
import Container from "./components/global/Container";
import Cart from "./components/cart/Cart";
import SearchInput from "./components/home/SearchInput";
import CategoryFilter from "./components/home/CategoryFilter";
import FoodList from "./components/home/FoodList";
import { toast } from "sonner";
import { useCart } from "@/app/hooks/useCart";

export default function Home() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [allFoods, setAllFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const produktetNeShporte = useCart((state) => state.produktetNeShporte);
  const setProduktetNeShporte = useCart((state) => state.setProduktetNeShporte);
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
          throw new Error("Food fetching response is not ok!");
        }
        const foodData = await foodResponse.json();

        if (foodData?.message) {
          return;
        }

        setFoods(foodData);
        setAllFoods(foodData);
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setProduktetNeShporte(JSON.parse(storedCartItems));
    }
  }, [setProduktetNeShporte]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(produktetNeShporte));
  }, [produktetNeShporte]);

  return (
    <Container className="pt-0">
      <Image
        priority
        className="rounded-3xl shadow w-full h-52 md:h-auto object-cover"
        src="/Banner_Pizza.jpg"
        alt="Pizza Banner"
        width={976}
        height={226}
      />
      <div className="flex pt-2 lg:pt-6 pb-6 md:gap-6 flex-col md:flex-row sm:gap-0">
        <div className="w-full lg:w-3/5 py-3 md:py-6">
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
          <FoodList
            foods={foods}
            loading={loading}
            setPopupData={setPopupData}
          />
        </div>
        <div className="w-full lg:w-2/5 py-3 md:py-6">
          <Cart />
        </div>
      </div>
      <QuickView popupData={popupData} setPopupData={setPopupData} />
    </Container>
  );
}
