"use client";

import type { Order } from "../utils/types";
import { useState, useRef } from "react";
import Cart from "../components/cart/Cart";
import Container from "../components/global/Container";
import { apiHandler } from "../utils/helpfulFunctions";
import { toast } from "sonner";
import { useCart } from "../hooks/useCart";

const CheckoutPage = () => {
  const produktetNeShporte = useCart((state) => state.produktetNeShporte);
  const [orderData, setOrderData] = useState<Order>({
    user_id: null,
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    extra: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setOrderData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {

      const mappedCartItems = produktetNeShporte
  .filter((item) => item.food_id !== undefined && item.quantity !== undefined)
  .map((item) => ({
    food_id: item.food_id!,
    quantity: item.quantity!,
    price: parseFloat((item.price * item.quantity!).toFixed(2)),
    extra: item.extra ?? "",
  }));


  const orderObject: Order = {
    ...orderData,
    items: [...mappedCartItems]
  };
      

      const response = await fetch(apiHandler("/api/order"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderObject),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(`${result.message}`);
        return;
      }
      toast.error(`${result.message}`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const triggerFormSubmit = () => {
    if (formRef.current) {
      const hiddenSubmitButton = formRef.current.querySelector(
        "button[type='submit']"
      ) as HTMLButtonElement;

      if (hiddenSubmitButton) {
        hiddenSubmitButton.click();
      }
    }
  };

  return (
    <Container className="mt-6">
      <div className="flex justify-center flex-col md:flex-row gap-4 md:gap-8 lg:gap-10 items-start">
        <form onSubmit={handleSubmit} ref={formRef} className="w-full">
          <div className="mb-5">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-black">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              value={orderData.name}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5"
            />
          </div>

          <div className="mb-5">
            <label htmlFor="address" className="block mb-2 text-sm font-medium text-black">
              Address
            </label>
            <input
              type="text"
              name="address"
              id="address"
              required
              value={orderData.address}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5"
            />
          </div>

          <div className="mb-5">
            <label htmlFor="city" className="block mb-2 text-sm font-medium text-black">
              City
            </label>
            <input
              type="text"
              name="city"
              id="city"
              required
              value={orderData.city}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5"
            />
          </div>

          <div className="mb-5">
            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-black">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              required
              value={orderData.phone}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5"
            />
          </div>

          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-black">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              value={orderData.email}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5"
            />
          </div>

          <div className="mb-5">
            <label htmlFor="extra" className="block mb-2 text-sm font-medium text-black">
              Extra
            </label>
            <textarea
              id="extra"
              name="extra"
              required
              value={orderData.extra}
              onChange={handleChange}
              className="min-h-24 bg-gray-50 border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5"
            ></textarea>
          </div>

          <button type="submit" className="hidden">
            Invisible Submit Button :)
          </button>
        </form>
        <Cart className="w-full" triggerFormSubmit={triggerFormSubmit} />
      </div>
    </Container>
  );
};

export default CheckoutPage;
