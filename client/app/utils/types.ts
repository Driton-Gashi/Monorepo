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
