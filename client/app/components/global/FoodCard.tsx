import Image from "next/image";

interface FoodCardType {
  // readonly id: number;
    readonly name: string;
    readonly imageUrl: string;
    readonly price: number;
    className?: string;
}

const FoodCard = ({
    // id,
    name,
    imageUrl,
    price,
    ...otherProps
}:FoodCardType)  => {
  const addToCart = (): void => {
    
  };
  
  return (
    <div {...otherProps}>
      <Image
      width={120}
      height={120}
        className="h-32"
        src={`https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${imageUrl}`}
        loading="eager"
        alt=""
        priority
      />
      <h2>{name}</h2>
      <h2 className="text-red-600 font-bold my-2">{price}€</h2>
      <button onClick={addToCart} className="py-2 w-full tex-sm text-red-600 rounded-3xl bg-transparent border-2 border-red-600 transition-colors hover:bg-red-600 hover:text-white">
        Shto ne Shporte
      </button>
    </div>
  );
};

export default FoodCard;
