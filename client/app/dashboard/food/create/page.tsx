"use client";
// import { useUser } from "@/app/context/UserContext";
import { useState } from "react";
import { pinata } from "@/app/utils/pinata";
import type {
  inputDataType
} from "@/app/utils/types";
import { toast } from "sonner";
import CreateFoodForm from "@/app/components/dashboard/CreateFoodForm";
import { apiHandler } from "@/app/utils/helpfulFunctions";

const DashboardFoodCreate = () => {
  // const { loggedInUserData } = useUser();
 
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

  return (
    <>
        <div className="border-t w-full">
          <h2 className="mt-8 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Create New Food
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
          <CreateFoodForm formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} handleChange={handleChange} />
        </div>
    </>
  );
};

export default DashboardFoodCreate;
