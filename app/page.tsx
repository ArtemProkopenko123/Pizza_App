import { getPizzas } from "@/lib/pizzas";
import PizzaItem from "@/components/pizza-list-item";

export default async function Home() {
  const pizzas = await getPizzas();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {pizzas.pizzas.map((pizza) => (
        <PizzaItem key={pizza.id} pizza={pizza} />
      ))}
    </div>
  );
}



