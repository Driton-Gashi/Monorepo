import type { inputDataType, categoryType } from "@/app/utils/types";
import { useState, useEffect, Dispatch, SetStateAction } from "react";

interface P{
    formData: inputDataType;
    handleSubmit: (e: React.FormEvent) => Promise<void>;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    setFormData: Dispatch<SetStateAction<inputDataType>>;
}

const CreateFoodForm = ({
    formData,
    handleSubmit,
    handleChange,
    setFormData,
}: P) => {
     const [categories, setCategories] = useState<categoryType[]>([]);

     useEffect(() => {
        const fetchCategories = async () => {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/categories`
          );
          const data = await response.json();
          setCategories(data);
        };
        fetchCategories();
      }, []);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Name
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Product name"
            className="border block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900  placeholder:text-gray-400 outline-2 outline-offset-2 outline-indigo-600 sm:text-sm/6"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="price"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Price
        </label>
        <div className="mt-2">
          <input
            type="number"
            name="price"
            value={formData.price}
            min={0.0}
            step="0.10"
            onChange={handleChange}
            placeholder="Product price"
            className="border block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="category"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Category
        </label>
        <div className="mt-2">
          <select
            value={formData.category_id}
            onChange={(e) => {
              const { name, value } = e.target;
              setFormData((prevData) => ({
                ...prevData,
                [name]: value,
              }));
            }}
            name="category_id"
            className="border block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          >
            <option value={0}>Choose a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="Image"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Image
        </label>
        <div className="mt-2">
          <input
            type="file"
            name="image"
            onChange={handleChange}
            accept="image/*"
            className="border block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Create
        </button>
      </div>
    </form>
  );
};

export default CreateFoodForm;
