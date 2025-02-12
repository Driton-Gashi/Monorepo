"use client";
import { useUser } from "../context/UserContext";
import { useState, useEffect } from "react";
import { pinata } from "../utils/pinata";
import type {
  inputDataType,
  categoryType,
  ModalAlertProps,
} from "../utils/types";
import { toast } from "sonner";
const Dashboard = () => {
  const { loggedInUserData } = useUser();
  const [categories, setCategories] = useState<categoryType[]>([]);
  const [formData, setFormData] = useState<inputDataType>({
    name: "",
    price: 0.0,
    category_id: 0,
    image: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === "image" && files) {
      setFormData((prevData) => ({
        ...prevData,
        image: files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (formData.name.length == 0) {
        toast.error("Name field is Empty!");
        return;
      }
      if (formData.price == 0) {
        toast.error("Price can't be 0!");
        return;
      }
      if (formData.category_id == 0) {
        toast.error("Please choose a category!");
        return;
      }
      if (!formData.image) {
        toast.error("Please add an image!");
        return;
      }

      const pinataResponse = await pinata.upload.file(formData.image);
      const image = pinataResponse.IpfsHash;

      const foodData = {
        name: formData.name,
        price: formData.price,
        category_id: formData.category_id,
        image_url: image,
      };

      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/food`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(foodData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(`Food created successfully:${result.message}`);
      } else {
        toast.error(`Failed to create food:${result.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(`Failed to create food:${error}`);
    }
  };

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
    <>
    
    <div className="container m-auto p-6">
      <form onSubmit={handleSubmit} className="m-auto">
        <div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Product name"
          />
        </div>
        <div>
          <input
            type="number"
            name="price"
            value={formData.price}
            min={0.0}
            step="0.10"
            onChange={handleChange}
            placeholder="Product price"
          />
        </div>
        <div>
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
          >
            <option value={0}>Choose a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            accept="image/*"
          />
        </div>
        <button
          type="submit"
          className="bg-red-700 rounded-lg shadow p-2 text-sm text-white"
        >
          Create Food
        </button>
      </form>
      <button onClick={() => toast("My first toast")}>test</button>
    </div>
    <h2>======================</h2>
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900  placeholder:text-gray-400 outline-2 outline-offset-2 outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Not a member?{' '}
            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Start a 14 day free trial
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
