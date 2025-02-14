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
  food_id: number;
  name: string;
  price: number;
  category_name: string;
  image_url: string;
}

export interface TableRowType{
  imageUrl: string;
  name: string;
  price: number;
  category: string;
  action: () => void;
}
