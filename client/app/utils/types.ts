export interface inputDataType {
    name: string;
    description: string;
    price: number;
    category_id: number;
    image: File | null;
  }

 export interface categoryType{
    id:number;
    name: string;
  }

export interface Food {
  food_id?: number;
  name: string;
  price: number;
  category_name?: string;
  category_id?: number;
  image_url?: string;
  className?: string;
}

export interface TableRowType{
  imageUrl: string;
  name: string;
  price: number;
  category: string;
  action: () => void;
}

export interface layoutType{
  children: React.ReactNode;
}