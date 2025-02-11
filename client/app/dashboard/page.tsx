"use client";
import { useUser } from "../context/UserContext";
import { useState, useEffect } from "react";
import { pinata } from "../utils/pinata"; 

interface inputDataType {
  name: string;
  price: number;
  category_id: number;
  image: File | null;
}

interface categoryType{
  id:number;
  name: string;
}

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
      let image = ""
      if (formData.image) {
        const pinataResponse = await pinata.upload.file(formData.image);
        image = pinataResponse.IpfsHash
      }

      const foodData = {
        name: formData.name,
        price: formData.price,
        category_id: formData.category_id,
        image_url: image, 
      };

      const url =`${process.env.NEXT_PUBLIC_API_URL}/api/food`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(foodData),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Food created successfully:", result.message);
      } else {
        console.log("Failed to create food:", result.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(()=>{
    const fetchCategories = async()=>{
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`)
      const data = await response.json()
      setCategories(data);
    }
    fetchCategories()
  },[])

  return (
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
            {categories.map((category)=>(
              <option key={category.id} value={category.id}>{category.name}</option>
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
    </div>
  );
};

export default Dashboard;
