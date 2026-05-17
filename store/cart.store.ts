import { Pizza } from "@/lib/pizzas";
import { create } from "zustand";

type CartItem = {
  id: number;
  name: string;
  price: number;
  size: number;
  quantity: number;
};

type CartStore = {
  items: CartItem[];
  addItem: (pizza: Pizza, size: number) => void;
  removeItem: (id: number, size: number) => void;
  updateQuantity: (id: number, size: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
};

export const useCartStore = create<CartStore>((set, get) => ({
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
          id: pizza.id,
          name: pizza.name,
          price: pizza.price_uah,
          size,
          quantity: 1,
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
    set((state) => ({
      items: state.items.map(i =>
        i.id === id && i.size === size ? { ...i, quantity } : i
      ),
    }));
  },

  clearCart: () => set({ items: [] }),

  totalItems: () => get().items.reduce((acc, i) => acc + i.quantity, 0),

  totalPrice: () => get().items.reduce((acc, i) => acc + i.price * i.quantity, 0),
}));
