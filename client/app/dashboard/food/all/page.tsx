"use client"
import { useState, useEffect } from "react";
import type {Food, TableRowType} from "@/app/utils/types"
import Image from "next/image";
import { apiHandler } from "@/app/utils/helpfulFunctions";
import { toast } from 'sonner';
import ActionDropdown from "@/app/components/dashboard/ActionDropdown";

const TableHead = ()=>{
  const thClass = "px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
  return <thead className="bg-gray-50">
  <tr>
  <th scope="col" className="py-3 px-4 pe-0">
    <div className="flex items-center h-5">
      <input id="hs-table-search-checkbox-all" type="checkbox" className="border-gray-200 rounded text-blue-600 focus:ring-blue-500"/>
      <label htmlFor="hs-table-search-checkbox-all" className="sr-only">Checkbox</label>
    </div>
  </th>
  <th scope="col" className={thClass}>Image</th>
  <th scope="col" className={thClass}>Product Name</th>
  <th scope="col" className={thClass}>price</th>
  <th scope="col" className={thClass}>Category</th>
  <th scope="col" className={`${thClass} text-end`}>Action</th>
</tr>
</thead>
}

const TableRow = ({
  id,
  imageUrl,
  name,
  price,
  category,
  deleteFunction,
}:TableRowType)=>{
  const tableDataClass = "px-6 py-4 whitespace-nowrap text-sm text-gray-800"
  return <tr>
  <td className="py-3 ps-4">
    <div className="flex items-center h-5">
      <input id="hs-table-search-checkbox-1" type="checkbox" className="border-gray-200 rounded text-blue-600 focus:ring-blue-500"/>
      <label htmlFor="hs-table-search-checkbox-1" className="sr-only">Checkbox</label>
    </div>
  </td>
  <td className={tableDataClass}><Image priority width={40} height={40} src={imageUrl && `https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${imageUrl}`} alt=""/></td>
  <td className={tableDataClass}>{name}</td>
  <td className={tableDataClass}>{price}€</td>
  <td className={tableDataClass}>{category}</td>
  <td className={`${tableDataClass} text-end`}>
    <ActionDropdown deleteFunction={deleteFunction} id={id}/>
  </td>
</tr>
}

const DashboardFoodAll = () => {
  const [foods, setFoods] = useState<Food[]>([]);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await fetch(
          apiHandler("/api/food")
        );
        if (!response.ok) {
          throw new Error("Failed to fetch foods");
        }
        const data = await response.json();
        setFoods(data);
      } catch (error) {
        console.error(error);
      } finally {
        // setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  const deleteFood = async (id: number) => {
    toast('Are you sure you want to delete this Food!', {
      action: {
        label: 'Yes',
        onClick: async() => {
          try {
            const response = await fetch(apiHandler(`/api/deleteFood/${id}`), {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
            });
        
            if (!response.ok) {
              toast.success("Food wasn't found!, try again later");
            }
        
            const result = await response.json();
      
            toast.success(result.message);

            const updatedFoods = foods.filter((food)=> food.food_id != id)
            setFoods(updatedFoods)
          } catch (error) {
            toast.error(error as string)
          }
        },
      },
    });
    
    
  };

  return (
    <>
    <div className="border-t w-full">
          <h2 className="mt-8 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            View All
          </h2>
    </div>
    
  <div className="m-auto max-w-2xl">
    <div className="p-1.5 min-w-full inline-block align-middle">
      <div className="border rounded-lg divide-y divide-gray-200">
        <div className="py-3 px-4">
          <div className="relative max-w-xs">
            <label htmlFor="hs-table-search" className="sr-only">Search</label>
            <input type="text" name="hs-table-search" id="hs-table-search" className="border py-2 px-3 ps-9 block w-full border-gray-300 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Search for items"/>
            <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3">
              <svg className="size-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
            </div>
          </div>
        </div>
        <div className="overflow-visible">
          <table className="min-w-full divide-y divide-gray-200">
            <TableHead/>
            <tbody className="divide-y divide-gray-200">
              {foods.map((food) => (
              <TableRow key={food.food_id} id={food.food_id} imageUrl={food.image_url ?? ''} name={food.name} price={food.price} category={food.category_name ?? ''} deleteFunction={()=>deleteFood(food.food_id ?? 0)}/>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
    </>
  )
}

export default DashboardFoodAll