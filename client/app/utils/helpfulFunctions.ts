import type { Food } from "./types";
// Function to fetch in Development and Production
export const apiHandler = (path: string): string => {
  let fetchPath = process.env.NEXT_PUBLIC_API_URL ?? "";
  fetchPath += path;
  return fetchPath;
};

export const totalPrice=(array: Food[]): string=>{
  
  let sum = 0;
  array.forEach(item => {
    if(!item.quantity) return;
    sum += item.price * item.quantity
  });
  return sum.toFixed(2);
}