import { create } from "zustand";
import type { Food } from "@/app/utils/types";

interface CartState {
  produktetNeShporte: Food[];
  setProduktetNeShporte: (items: Food[]) => void;
  addToCart: (item: Food) => void;
  removeFromCart: (id: number) => void;
}

export const useCart = create<CartState>((set) => ({
  produktetNeShporte: [],
  setProduktetNeShporte: (items) => set({ produktetNeShporte: items }),
  addToCart: (item) =>
    set((state) => ({
      produktetNeShporte: [...state.produktetNeShporte, item],
    })),
  removeFromCart: (id) =>
    set((state) => ({
      produktetNeShporte: state.produktetNeShporte.filter(
        (item) => item.food_id !== id
      ),
    })),
}));
