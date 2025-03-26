import Input from "../global/Input";
import type { Food } from "@/app/utils/types";
import { useState, useEffect } from "react";
interface P {
  setCurrentCategory: React.Dispatch<React.SetStateAction<string | number>>;
  setFoods: React.Dispatch<React.SetStateAction<Food[]>>;
  allFoods: Food[];
}

const SearchInput = ({ setCurrentCategory, setFoods, allFoods }: P) => {
  const [searchString, setSearchString] = useState<string>("");
  
  useEffect(() => {
    const searchFunction = () => {
      if (searchString == "") {
        setFoods(allFoods);
        setCurrentCategory("all");
        return;
      }

      const filtered = allFoods.filter(
        (food) =>
          food.name.toLowerCase().includes(searchString.toLowerCase()) ||
          food.price
            .toString()
            .toLowerCase()
            .includes(searchString.toLowerCase()) ||
          food.category_name?.toLowerCase().includes(searchString.toLowerCase())
      );

      setFoods(filtered);
    };
    searchFunction();
  }, [searchString, allFoods, setFoods, setCurrentCategory]);

  return (
    <div className="relative">
      <Input
        onFocus={() => {
          setCurrentCategory("all");
          setFoods(allFoods);
        }}
        type="text"
        placeholder="Search by name, price, category..."
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
      />
      <svg
        onClick={() => setSearchString("")}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        className={`size-4 absolute top-1/2 right-4 -translate-y-1/2 ${
          searchString ? "" : "hidden"
        } cursor-pointer`}
      >
        <path
          fillRule="evenodd"
          d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm2.78-4.22a.75.75 0 0 1-1.06 0L8 9.06l-1.72 1.72a.75.75 0 1 1-1.06-1.06L6.94 8 5.22 6.28a.75.75 0 0 1 1.06-1.06L8 6.94l1.72-1.72a.75.75 0 1 1 1.06 1.06L9.06 8l1.72 1.72a.75.75 0 0 1 0 1.06Z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
};

export default SearchInput;
