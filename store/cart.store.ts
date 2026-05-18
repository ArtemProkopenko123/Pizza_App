import { Pizza } from "@/lib/pizzas";
import { create } from "zustand";
import { PIZZA_SIZE_MULTIPLIER, PizzaSize } from "@/utils/constants";

type CartItem = {
  id: number;
  name: string;
  price: number;
  size: PizzaSize;
  quantity: number;
};

type CartStore = {
  items: CartItem[];
  addItem: (pizza: Pizza, size: PizzaSize) => void;
  removeItem: (id: number, size: PizzaSize) => void;
  updateQuantity: (id: number, size: PizzaSize, quantity: number) => void;
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
          price: Math.round(pizza.price_uah * PIZZA_SIZE_MULTIPLIER[size]),
          size,
          quantity: 1,
        }],
      };
    });
  },

  removeItem: (id, size: PizzaSize) => {
    set((state) => ({
      items: state.items.filter(i => !(i.id === id && i.size === size)),
    }));
  },

  updateQuantity: (id, size: PizzaSize, quantity) => {
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
