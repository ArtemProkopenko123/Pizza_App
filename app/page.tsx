import { getPizzas } from "@/lib/pizzas";
import PizzaItem from "@/components/pizza-card/pizza-list-item";
import PizzaCarousel from "@/components/carousel/pizza-carousel";
import FilterTagsMain from "@/app/components/filter/filter-tags-main";
// import SearchFilter from "@/components/filter/search-filter";

type HomeProps = {
  searchParams: Promise<{ tag?: string }>
}


export default async function Home({ searchParams }: HomeProps) {
  const { tag } = await searchParams;
  const pizzas = await getPizzas(tag);
  
  return (<>
    <PizzaCarousel />
    <div className="grid grid-cols-3 items-center mb-3">
      {/* <SearchFilter /> */}
      <div/>
      <h2 className="text-4xl font-bold text-center">Menu</h2>
      <div className="flex justify-end">
        <FilterTagsMain />
      </div>
    </div>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {pizzas.pizzas.map((pizza) => (
        <PizzaItem key={pizza.id} pizza={pizza} />
      ))}
    </div>
  </>);
}



