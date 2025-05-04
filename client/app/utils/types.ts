export interface inputDataType {
    imageUrl?: string,
    id?: number,
    name: string;
    description: string;
    price: number;
    category_id: number;
    image?: File | null;
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
  extra?: string;
  quantity?: number;
}

export interface TableRowType{
  id?: number;
  imageUrl: string;
  name: string;
  price: number;
  category: string;
  deleteFunction: () => void;
}

export interface layoutType{
  children: React.ReactNode;
}

export interface popupData {
  id: number;
  name:string;
  price: number;
  imageSrc: string;
  imageAlt?: string;
  visible: boolean;
}

export interface OrderItem {
  food_id: number;
  quantity: number;
  price: number;
  extra: string;
}

export interface Order {
  id?: number;
  user_id: number | null;
  name: string;
  email: string;
  address: string;
  city: string;
  phone: string;
  extra: string;
  created_at?: Date;
  items?: OrderItem[];
}

export interface User {
  id?: number;
  name?: string;
  lastname?: string;
  email?: string;
  role?: string;
  password?: string;
  address?: string;
  city?: string;
  phone?: string;
}