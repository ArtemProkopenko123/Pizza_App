import { PizzaType } from "@/lib/types";
import { create } from "zustand";
import { PIZZA_SIZE_MULTIPLIER, PIZZA_WEIGHT_MULTIPLIER, PizzaSize } from "@/utils/constants";
import { createJSONStorage, persist } from 'zustand/middleware'

export type CartItemType = Omit<PizzaType, "tags" | "description"> & {
  size: PizzaSize;
  quantity: number;
};

type CartStore = {
  items: CartItemType[];
  addItem: (pizza: PizzaType, size: PizzaSize) => void;
  removeItem: (id: number, size: PizzaSize) => void;
  updateQuantity: (id: number, size: PizzaSize, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
};

export const useCartStore = create<CartStore>()(persist((set, get) => ({
  items: [],

  addItem: (pizza, size) => {
    set((state) => {
      const existing = state.items.find(i => i.id === pizza.id && i.size === size);
      if (existing) {
        return {
          items: state.items.map(i =>
            i.id === pizza.id && i.size === size ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return {
        items: [...state.items, {
          ...pizza,
          size,
          quantity: 1,
          price_uah: Math.round(pizza.price_uah * PIZZA_SIZE_MULTIPLIER[size]),
          weight_g: Math.round(pizza.weight_g * PIZZA_WEIGHT_MULTIPLIER[size]),
        }],
      };
    });
  },

  removeItem: (id, size) => {
    set((state) => ({
      items: state.items.filter(i => !(i.id === id && i.size === size)),
    }));
  },

  updateQuantity: (id, size, quantity) => {
    const item = get().items.find(i => i.id === id && i.size === size);
    if (!item) return;
    set((state) => ({
      items: state.items.map(i =>
        i.id === id && i.size === size ? { ...i, quantity } : i
      ),
    }));
  },

  clearCart: () => set({ items: [] }),

  totalItems: () => get().items.reduce((acc, i) => acc + i.quantity, 0),

  totalPrice: () => get().items.reduce((acc, i) => acc + i.price_uah * i.quantity, 0),
}), {
  name: 'cart',
  storage: createJSONStorage(() => localStorage),
}));
