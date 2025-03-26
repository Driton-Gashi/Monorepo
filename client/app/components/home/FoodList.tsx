import FoodCardSkeleton from "./FoodCardSkeleton";
import FoodCard from "./FoodCard";
import type { Food, popupData } from "@/app/utils/types";

interface P{
    loading: boolean;
    foods: Food[];
    setPopupData: React.Dispatch<React.SetStateAction<popupData>>
}

const FoodList = ({loading, foods, setPopupData}:P) => {
  return (
    <>
    {loading ? (
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
    </>
  )
}

export default FoodList