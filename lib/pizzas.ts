import pizzas from "@/data/pizzas.json";
import { PizzasDataType, PizzaType } from "./types";

export async function getPizzas(): Promise<PizzasDataType> {
  await new Promise(resolve => setTimeout(resolve, 300));
  return pizzas;
}

export async function getPizzaById(id: number): Promise<PizzaType | null> {
  const data = await getPizzas();
  return data.pizzas.find((pizza) => pizza.id === id) || null;
}

export async function getPizzasForCarousel(): Promise<PizzaType[]> {
  const data = await getPizzas();
  return data.pizzas.sort((a, b) => a.price_uah - b.price_uah).slice(0, 10);
}
