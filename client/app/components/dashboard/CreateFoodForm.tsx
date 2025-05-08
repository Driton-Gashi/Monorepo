import type { inputDataType, categoryType } from "@/app/utils/types";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { apiHandler } from "@/app/utils/helpfulFunctions";
import { toast } from "sonner";
import Input from "../global/Input";
import Button from "../global/Button";

interface P {
  formData: inputDataType;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setFormData: Dispatch<SetStateAction<inputDataType>>;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
}

const CreateFoodForm = ({
  formData,
  handleSubmit,
  handleChange,
  setFormData,
  fileInputRef,
}: P) => {
  const [categories, setCategories] = useState<categoryType[]>([]);
  const [isCreateCategoryOpen, setIsCreateCategoryOpen] =
    useState<boolean>(false);
  const [categoryName, setCategoryName] = useState<string>("");

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(apiHandler("/api/categories"));

      const data = await response.json();

      if(data?.message){
        return;
      }

      setCategories(data);
    };
    fetchCategories();
  }, [isCreateCategoryOpen]);

  const createCategorySubmit = async (e: React.FormEvent)=>{
    e.preventDefault();
    try {

      if(!categoryName){
      toast.error("Category name is empty!")
      return;
      }

      const response = await fetch(apiHandler("/api/categories"),{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name: categoryName}),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(`${result.message}`);
        setCategoryName("")
      } else {
        toast.error(`${result.message}`);
      }

    } catch (error) {
      if(error instanceof Error)
      toast.error(error.message)
    }
  }

  const deleteCategory = async (id: number)=>{
    try {
      const response = await fetch(apiHandler(`/api/categories/${id}`), {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const result = await response.json()

      if(response.ok){
        toast.success(result.message)
        setCategories((prevState)=>{
          return prevState.filter(category => category.id !== id)
        })
      }else{
        toast.error(result.message)
      }
    } catch (error: unknown) {
      if(error instanceof Error){
        toast.error(error.message)
      }
    }
  }

  return (
    <form onSubmit={isCreateCategoryOpen ? createCategorySubmit: handleSubmit} className="space-y-2">
      <div>
        <label
          htmlFor="Image"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Image
        </label>
        <div className="mt-2">
          <Input
          ref={fileInputRef}
          disabled={isCreateCategoryOpen}
            type="file"
            name="image"
            onChange={handleChange}
            accept="image/*"
            className={`${isCreateCategoryOpen && "cursor-not-allowed"}  sm:text-sm/6`}
          />
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
          <Input
          disabled={isCreateCategoryOpen}
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Product name"
            className={`${isCreateCategoryOpen && "cursor-not-allowed"}  sm:text-sm/6`}
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
          disabled={isCreateCategoryOpen}
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
            className={`${isCreateCategoryOpen && "cursor-not-allowed"} w-full px-4 py-2 rounded border border-gray-300 focus:border-primary-red focus:ring-1 focus:ring-primary-red focus:outline-none sm:text-sm/6 resize-none h-16`}
          ></textarea>
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
          <Input
          disabled={isCreateCategoryOpen}
            type="number"
            name="price"   
            value={formData.price}
            min={0.0}
            step="0.10"
            onChange={handleChange}
            placeholder="Product price"
            className={`${isCreateCategoryOpen && "cursor-not-allowed"}  sm:text-sm/6`}
          />
        </div>
      </div>
      {isCreateCategoryOpen ? (
        <div className="shadow-lg p-2 rounded-md">
          <h6 className="mb-2">Create Category</h6>
          <div className="flex flex-wrap gap-2 mb-2">
          {categories.map((category)=>(
            <div
            key={category.id}
            className="inline-flex items-center justify-between space-x-1 bg-red-100 text-primary-red px-2 py-0.5 rounded-md text-sm">
            <svg onClick={()=> deleteCategory(category.id)} className="cursor-pointer h-4 w-4 text-primary-red"
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <div className="select-none">
                {category.name}
            </div>
        </div>
          ))}
          </div>
        <div className="mt-2 flex gap-4 relative">
          <Input
            type="text"
            name="category"
            value={categoryName}
            onChange={(e)=>setCategoryName(e.target.value)}
            placeholder="Category name"
            className=" sm:text-sm/6"
          />
          <Button type="submit" className="bg-primary-red text-primary-white rounded-md border shadow-sm py-2 px-6 text-sm/6">Create</Button>
          <div
            onClick={()=>setIsCreateCategoryOpen(false)}
              title="create category"
              className="hover:shadow-lg shadow-sm select-none transition-shadow rotate-45 flex justify-center items-center cursor-pointer absolute -right-12 top-1/2 -translate-y-1/2 border w-8 h-8 rounded-full"
            >
              +
            </div>
        </div>
        
      </div>
      ) : (
        <div>
          <label
            htmlFor="category"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Category
          </label>
          <div className="mt-2 relative">
            {
              categories.length ? (<select
                value={formData.category_id}
                onChange={(e) => {
                  const { name, value } = e.target;
                  setFormData((prevData) => ({
                    ...prevData,
                    [name]: value,
                  }));
                }}
                name="category_id"
                className="w-full px-4 py-2 rounded border border-gray-300 focus:border-primary-red focus:ring-1 focus:ring-primary-red focus:outline-none sm:text-sm/6"
              >
                <option value={0}>Choose a category</option>
                {categories.map((category) => (
                  <option className="relative" key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>) : <select disabled className="cursor-not-allowed w-full px-4 py-2 rounded border border-gray-300 focus:border-primary-red focus:ring-1 focus:ring-primary-red focus:outline-none sm:text-sm/6">
                <option value="">No Categories found!</option>
              </select>
            }
            
            <div
            onClick={()=>setIsCreateCategoryOpen(true)}
              title="create new category"
              className="transition-shadow hover:shadow-lg shadow-sm select-none rotate-0 flex justify-center items-center cursor-pointer absolute -right-12 top-1/2 -translate-y-1/2 border w-8 h-8 rounded-full"
            >
              +
            </div>
          </div>
        </div>
      )}

      <div>
        <button
          disabled={isCreateCategoryOpen}
          type="submit"
          className={`${isCreateCategoryOpen && 'cursor-not-allowed !bg-gray-100 !text-primary-black'} mt-4 flex w-full justify-center rounded-md bg-primary-red px-3 py-1.5 text-sm/6 font-semibold text-primary-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-red`}
        >
          Create
        </button>
      </div>
    </form>
  );
};

export default CreateFoodForm;
