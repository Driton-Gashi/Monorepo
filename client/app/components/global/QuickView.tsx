"use client";

import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import type { popupData, Food } from "@/app/utils/types";
import { useCart } from "@/app/hooks/useCart";

interface P {
  popupData: popupData;
  setPopupData: React.Dispatch<React.SetStateAction<popupData>>;
}

export default function QuickView({ popupData, setPopupData }: P) {
  const [extra, setExtra] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  const produktetNeShporte = useCart((state) => state.produktetNeShporte);
  const setProduktetNeShporte = useCart((state) => state.setProduktetNeShporte);

  const closeModal = () => {
    setPopupData((prevData) => ({
      ...prevData,
      visible: false,
    }));
    setQuantity(1);
    setExtra("");
  };

  const addToCart = () => {
    const food: Food = {
      name: popupData.name,
      price: popupData.price,
      extra: extra,
      image_url: popupData.imageSrc,
      food_id: popupData.id,
      quantity: quantity,
    };

    const alreadyInCart = produktetNeShporte.some(
      (item) => item.food_id === food.food_id
    );

    if (!alreadyInCart) {
      setProduktetNeShporte([...produktetNeShporte, food]);
    }

    closeModal();
  };

  return (
    <Dialog
      open={popupData.visible}
      onClose={closeModal}
      className="relative z-10"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 hidden bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in md:block"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
          <DialogPanel
            transition
            className="flex w-full transform text-left text-base transition data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in md:my-8 md:max-w-2xl md:px-4 data-closed:md:translate-y-0 data-closed:md:scale-95 lg:max-w-4xl"
          >
            <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
              <button
                type="button"
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
              >
                <span className="sr-only">Close</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>

              <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                <Image
                  priority
                  alt={popupData.imageAlt ?? ""}
                  src={`https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${popupData.imageSrc}`}
                  width={494}
                  height={742}
                  className="aspect-2/3 w-full rounded-lg bg-gray-100 object-cover sm:col-span-4 lg:col-span-5"
                />
                <div className="sm:col-span-8 lg:col-span-7">
                  <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
                    {popupData.name}
                  </h2>

                  <section className="mt-2">
                    <p className="text-2xl text-gray-900">{popupData.price}€</p>
                  </section>

                  <section className="mt-10">
                    <div>
                      <label htmlFor="extra">KËRKESA SHTESË</label>
                      <textarea
                        id="extra"
                        maxLength={300}
                        name="description"
                        value={extra}
                        onChange={(e) => setExtra(e.target.value)}
                        className="border block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 outline-2 outline-offset-2 outline-primary-bg-primary-red sm:text-sm/6"
                      ></textarea>

                      <div className="mt-6 flex gap-4 items-center">
                        <span
                          onClick={() =>
                            setQuantity((prev) => Math.max(1, prev - 1))
                          }
                          className="border border-primary-red text-primary-red w-8 h-8 flex justify-center items-center rounded-full cursor-pointer"
                        >
                          -
                        </span>
                        <span className="text-xl">{quantity}X</span>
                        <span
                          onClick={() =>
                            setQuantity((prev) => Math.min(10, prev + 1))
                          }
                          className="border bg-primary-red text-white w-8 h-8 flex justify-center items-center rounded-full cursor-pointer"
                        >
                          +
                        </span>
                      </div>

                      <button
                        onClick={addToCart}
                        type="submit"
                        className="mt-6 mb-10 flex w-full items-center justify-center rounded-md border border-transparent bg-primary-red px-8 py-3 text-base font-medium text-white hover:bg-primary-red focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </section>
                </div>
              </div>
              <div className="absolute bottom-4 right-8 text-sm font-medium px-5 py-2.5 rounded-sm bg-primary-black text-primary-white">
                Total: {(popupData.price * quantity).toFixed(2)}€
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
