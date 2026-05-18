import pizzas from "@/data/pizzas.json";

export async function getPizzas(): Promise<PizzasData> {
  await new Promise(resolve => setTimeout(resolve, 300));
  return pizzas;
}

export async function getPizzaById(id: number): Promise<Pizza | null> {
  const data = await getPizzas();
  return data.pizzas.find((pizza) => pizza.id === id) || null;
}

// get 6 pizzas with lowest prices for carousel
export async function getPizzasForCarousel(): Promise<Pizza[]> {
  const data = await getPizzas();
  return data.pizzas.sort((a, b) => a.price_uah - b.price_uah).slice(0, 10);
}

export interface Restaurant {
  name: string;
  city: string;
  currency: string;
  phone: string[];
  address: string;
  website: string;
  working_hours: string;
  instagram: string;
}

export interface Pizza {
  id: number;
  name: string;
  description: string;
  weight_g: number;
  price_uah: number;
  tags: string[];
  image_url: string;
}

export interface PizzasData {
  restaurant: Restaurant;
  pizzas: Pizza[];
  note: string;
}