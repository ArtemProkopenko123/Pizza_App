import pizzas from "@/data/pizzas.json";
import pizzasTags from "@/data/pizzas-tags.json";
import { PizzasDataType, PizzasTagsDataType, PizzaType } from "./types";

export async function getPizzas(tag?: string | null): Promise<PizzasDataType> {
  await new Promise(resolve => setTimeout(resolve, 300));
  if(tag) {
    return {
      ...pizzas,
      pizzas: pizzas.pizzas.filter((pizza) => pizza.tags.includes(tag)),
    };
  }
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

export async function getPizzaTags(): Promise<PizzasTagsDataType['tags']> {
  await new Promise(resolve => setTimeout(resolve, 300));
  return pizzasTags.tags;
}