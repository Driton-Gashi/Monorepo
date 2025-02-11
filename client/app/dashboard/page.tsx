"use client";
import { useUser } from "../context/UserContext";
import { useState } from "react";
// import { redirect } from "next/navigation";  <=== remove this comment to add redirection again

interface inputDataType {
  name: string;
  price: number;
  category: string;
  image_url: string;
}

const dashboard = () => {
  const { loggedInUserData } = useUser();
  // if(!loggedInUserData) redirect("/") <=== remove this comment to add redirection again
  const [formData, setFormData] = useState<inputDataType>({
    name: "",
    price: 0.00,
    category: "",
    image_url:"",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
 const handleSubmit=async (e: React.FormEvent)=>{
     e.preventDefault();
      
      const url =process.env.NEXT_PUBLIC_API_URL+"/api/food";

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
      
        const result = await response.json();
    
        if (response.ok) {
          console.log("Authentication was successful:", result.message);
        } else {
          console.log("Authentication failed:", result.message);
        }
  }

  return (
    <div className="container m-auto p-6">
      <form onSubmit={handleSubmit} className="m-auto">
        <div >
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="product name" />
        </div>
        <div>
          <input type="number" name="price" value={formData.price} min={0.00} step="0.10" onChange={handleChange} placeholder="product price" />
        </div>
        <div>
          <select value={formData.category} onChange={(e)=>{
             const { name, value } = e.target;
             setFormData((prevData) => ({
               ...prevData,
               [name]: value,
             }));
          }} name="category">
            <option value="others">Choose a category</option>
            <option value="Samun">Samun</option>
            <option value="Burgers">Burgers</option>
            <option value="Doner">Doner</option>
            <option value="Sandwich">Sandwich</option>
            <option value="Pizza">Pizza</option>
          </select>
        </div>
        <div>
          <input type="text" name="image_url" value={formData.image_url} onChange={handleChange} placeholder="Enter Image url here" />
        </div>
        <button type="submit" className="bg-red-700 rounded-lg shadow p-2 text-sm text-white">Create Food</button>
      </form>
    </div>
  );
};

export default dashboard;
