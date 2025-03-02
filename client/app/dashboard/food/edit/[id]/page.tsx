"use client";
// import { useUser } from "@/app/context/UserContext";
import { useState, useEffect } from "react";
import { pinata } from "@/app/utils/pinata";
import type { inputDataType } from "@/app/utils/types";
import EditFoodForm from "@/app/components/dashboard/EditFoodForm";
import { fetchInProdAndDev } from "@/app/utils/helpfulFunctions";
import { useParams } from "next/navigation";
import { toast } from "sonner";

interface FoodType {
  food_id: number;
  name: string;
  price: number;
  description: string;
  image_url: string;
  category_id: number;
}

const DashboardFoodCreate = () => {
  // const { loggedInUserData } = useUser();
  const params = useParams();
  const id = params.id;
  const [isImageInvalid, setIsImageInvalid] = useState<boolean>(false);

  const defaultFoodStructure = {
    id: 0,
    name: "",
    description: "",
    price: 0.0,
    category_id: 0,
    image: null,
    imageUrl: "",
  }

  const [unchangedFood, setUnchangedFood] = useState<inputDataType>(defaultFoodStructure);

  const [formData, setFormData] = useState<inputDataType>(defaultFoodStructure);

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
      if (!formData.description) {
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
      if (isImageInvalid) {
        toast.error("Please enter a valid image URL or upload an image");
        return;
      }
      if (!formData.image && !formData.imageUrl) {
        toast.error("Please add an Image either upload or add an URL");
        return;
      }

      const requestData = {
        food_id: formData.id,
        name: formData.name,
        description: formData.description,
        price: formData.price,
        category_id: formData.category_id,
        image_url: "",
      };
      
      if (formData.image) {

        const pinataResponse = await pinata.upload.file(formData.image);
        const image = pinataResponse.IpfsHash;

        requestData.image_url = image;
      } else {
        requestData.image_url = formData.imageUrl ?? "bafkreif5p5ksiqktieivz2t5hcwvyzhv4sgmi3xvhc4kw2p75kukihhm34";
      }

      console.log("Unchanged Food", unchangedFood);
      console.log("Updated Food", formData);

    const areEqual = JSON.stringify(unchangedFood) === JSON.stringify(formData);

      if(areEqual){
        toast.error("Change couldn't be made, no fields were changed!");
        return;
      }
      // const response = await fetch(fetchInProdAndDev("/api/food"), {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(foodData),
      // });

      // const result = await response.json();

      // if (response.ok) {
      //   toast.success(`Food created successfully:${result.message}`);
      // } else {
      //   toast.error(`Failed to create food:${result.message}`);
      // }
    } catch (error) {
      console.error("Error:", error);
      toast.error(`Failed to create food:${error}`);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(fetchInProdAndDev(`/api/foodByID/${id}`));
        const data = (await response.json()) as FoodType;
        setUnchangedFood({
          id: data.food_id,
          name: data.name,
          price: data.price,
          description: data.description,
          imageUrl: data.image_url,
          category_id: data.category_id,
        });
        setFormData({
          id: data.food_id,
          name: data.name,
          price: data.price,
          description: data.description,
          imageUrl: data.image_url,
          category_id: data.category_id,
        });
      } catch (error) {
        console.error(error);
        toast.error(error as string);
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      <div className="border-t w-full">
        <h2 className="mt-8 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Edit Food
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
        <EditFoodForm
          setIsImageInvalid={setIsImageInvalid}
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        />
      </div>
    </>
  );
};

export default DashboardFoodCreate;
