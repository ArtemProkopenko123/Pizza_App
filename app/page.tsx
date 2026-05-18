import { getPizzas } from "@/lib/pizzas";
import PizzaItem from "@/components/pizza-card/pizza-list-item";
import PizzaCarousel from "@/components/carousel/pizza-carousel";

export default async function Home() {
  const pizzas = await getPizzas();
  return (<>
    <PizzaCarousel />
    <h2 className="text-4xl font-bold text-center mb-3">Menu</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {pizzas.pizzas.map((pizza) => (
        <PizzaItem key={pizza.id} pizza={pizza} />
      ))}
    </div>
  </>);
}



