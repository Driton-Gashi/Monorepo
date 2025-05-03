import type { Food, categoryType } from "@/app/utils/types";
import { useState, useEffect } from "react";
import { apiHandler } from "@/app/utils/helpfulFunctions";
import { toast } from "sonner";

interface P {
  setFoods: React.Dispatch<React.SetStateAction<Food[]>>;
  allFoods: Food[];
  setCurrentCategory: React.Dispatch<React.SetStateAction<string | number>>;
  currentCategory: string | number;
}

const CategoryFilter = ({
  allFoods,
  setCurrentCategory,
  setFoods,
  currentCategory,
}: P) => {
  const [categories, setCategories] = useState<categoryType[]>([]);

  const getFoodByCategory = async (id: number) => {
    const foodsByCategory = allFoods.filter((food) => food.category_id == id);
    setFoods(foodsByCategory);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryResponse = await fetch(apiHandler("/api/categories"));

        if (!categoryResponse.ok) {
          throw new Error("Category Fetching response is not ok");
        }

        const categoryData = await categoryResponse.json();
        if(categoryData?.message){
          toast.error(categoryData?.message)
          return;
        }
        setCategories(categoryData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
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
          } hover:bg-primary-red hover:text-primary-white py-2 mx-1 px-4 rounded-3xl uppercase`}
          onClick={() => {
            getFoodByCategory(category.id);
            setCurrentCategory(category.id);
          }}
          key={category.id}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
