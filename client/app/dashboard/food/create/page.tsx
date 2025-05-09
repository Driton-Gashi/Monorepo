"use client";
import { useState, useRef } from "react";
import { pinata } from "@/app/utils/pinata";
import type {
  inputDataType
} from "@/app/utils/types";
import { toast } from "sonner";
import CreateFoodForm from "@/app/components/dashboard/CreateFoodForm";
import { apiHandler } from "@/app/utils/helpfulFunctions";
import { useUser } from "@/app/context/UserContext";
import { redirect } from "next/navigation";

const DashboardFoodCreate = () => {
  const {loggedInUserData} = useUser();
  if(!loggedInUserData || loggedInUserData.role != "admin"){
    redirect("/")
  }

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [formData, setFormData] = useState<inputDataType>({
    name: "",
    description: "",
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
      if (!formData.image) {
        toast.error("Please add an image!");
        return;
      }
      if (formData.name.length == 0) {
        toast.error("Name field is Empty!");
        return;
      }
      if(!formData.description){
        toast.error("Description is Empty!");
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

      const pinataResponse = await pinata.upload.file(formData.image);
      const image = pinataResponse.IpfsHash;

      const foodData = {
        name: formData.name,
        description: formData.description,
        price: formData.price,
        category_id: formData.category_id,
        image_url: image,
      };

      const response = await fetch(apiHandler("/api/foods"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(foodData),
      });
      
      const result = await response.json();
      
      if (response.status === 409) {
        toast.error(result?.message);
        return;
      }

      if (response.ok) {
        toast.success(`${result.message}`);
        setFormData({
          name: "",
          description: "",
          price: 0.0,
          category_id: 0,
          image: null,
        })
        // clear the input file
        if(fileInputRef.current) fileInputRef.current.value = "";
      }
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  return (
    <>
        <div className="border-t w-full">
          <h2 className="mt-4 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Create New Food
          </h2>
        </div>

        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
          <CreateFoodForm formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} handleChange={handleChange} fileInputRef={fileInputRef}/>
        </div>
    </>
  );
};

export default DashboardFoodCreate;
