"use client";
import type { inputDataType, categoryType } from "@/app/utils/types";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { apiHandler } from "@/app/utils/helpfulFunctions";
import Image from "next/image";

interface P {
  formData: inputDataType;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setFormData: Dispatch<SetStateAction<inputDataType>>;
  setIsImageInvalid: Dispatch<SetStateAction<boolean>>;
}

const EditFormData = ({
  formData,
  handleSubmit,
  handleChange,
  setFormData,
  setIsImageInvalid,
}: P) => {
  const [categories, setCategories] = useState<categoryType[]>([]);
  const [hasImageUrl, setHasImageUrl] = useState<boolean>(false);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(apiHandler("/api/categories"));
        if (!response.ok) throw new Error(" categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
    if (formData.imageUrl) setHasImageUrl(!!formData.imageUrl);
  }, [formData.imageUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        setFormData((prevData) => ({
          ...prevData,
          image: file,
        }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="Image"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Image
        </label>
        <div className="mt-2 relative">
          {hasImageUrl ? (
            <>
              <Image
                width={42}
                height={42}
                src={`https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${formData.imageUrl}`}
                alt=""
                onLoad={() => setIsImageInvalid(false)}
                onError={() => setIsImageInvalid(true)}
              />
              <input
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="Image Url"
                className="border block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900  placeholder:text-gray-400 outline-2 outline-offset-2 outline-indigo-600 sm:text-sm/6"
              />
            </>
          ) : (
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              accept="image/*"
              className="border block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          )}
          <label
            className={`absolute right-0 ${
              hasImageUrl ? "top-1/4" : "top-1/2"
            } -translate-y-1/2 inline-flex items-center me-5 cursor-pointer`}
          >
            <input
              type="checkbox"
              className="sr-only peer"
              checked={hasImageUrl}
              onChange={() => setHasImageUrl((prev) => !prev)}
            />
            <div className="relative w-11 h-6 bg-gray-200 rounded-full border shadow dark:bg-white peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600 dark:peer-checked:bg-red-600"></div>
            <span className="ms-3 text-sm font-medium text-gray-900">
              {hasImageUrl ? "Upload" : "Url"}
            </span>
          </label>
        </div>
      </div>

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
          htmlFor="description"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Description
        </label>
        <div className="mt-2">
          <textarea
            maxLength={300}
            name="description"
            value={formData.description}
            onChange={(e) => {
              const { name, value } = e.target;
              setFormData((prevData) => ({
                ...prevData,
                [name]: value,
              }));
            }}
            placeholder="Product description"
            className="border block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900  placeholder:text-gray-400 outline-2 outline-offset-2 outline-indigo-600 sm:text-sm/6"
          ></textarea>
          <p className="text-sm text-gray-500 text-right">
            {formData.description.length}/300
          </p>
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
              const { value } = e.target;
              setFormData((prevData) => ({
                ...prevData,
                category_id: Number(value),
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
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Update
        </button>
      </div>
    </form>
  );
};

export default EditFormData;
