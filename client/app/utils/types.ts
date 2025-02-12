export interface inputDataType {
    name: string;
    price: number;
    category_id: number;
    image: File | null;
  }
  
 export interface categoryType{
    id:number;
    name: string;
  }

 export interface ModalAlertProps {
    type: "info" | "error" | "success" | "default";
    message: string;
    isOpen: boolean;
    link?: string;
    linkText?: string;
  }