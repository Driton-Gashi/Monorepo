import Image from "next/image";
import type { Food, popupData } from "@/app/utils/types";
import { Dispatch, SetStateAction } from "react";
interface foodCard extends Food {
  setPopupData: Dispatch<SetStateAction<popupData>>
}

const FoodCard = ({ name, image_url, price, className, food_id, setPopupData }: foodCard) => {

  const openPopup = (): void => {
    
    setPopupData({
      id: food_id ?? 0,
      name: name,
      imageSrc: image_url ?? "",
      price:price,
      visible: true,
    })
  };

  return (
    <div className={className}>
      <Image
        width={120}
        height={120}
        className="h-32"
        src={`https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${image_url}`}
        loading="eager"
        alt=""
        priority
      />
      <h2>{name}</h2>
      <h2 className="text-red-600 font-bold my-2">{price}€</h2>
      <button
        onClick={openPopup}
        className="py-2 w-full tex-sm text-red-600 rounded-3xl bg-transparent border-2 border-red-600 transition-colors hover:bg-red-600 hover:text-white"
      >
        Shto ne Shporte
      </button>
    </div>
  );
};

export default FoodCard;