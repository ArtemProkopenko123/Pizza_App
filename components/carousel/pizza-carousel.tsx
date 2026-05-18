import { getPizzasForCarousel } from "@/lib/pizzas";
import PizzaCarouselLogic from "./pizza-carousel-logic";
import { Gem } from "lucide-react";

const PizzaCarousel = async () => {
    const pizzas = await getPizzasForCarousel();
    
    if(!pizzas.length) return null;
    return (
        <div className="w-full h-full mb-3">
            <div className="flex items-center justify-center mb-2">
                <Gem className="w-10 h-10 stroke-teal-500" />
                    <h2 className="text-2xl font-bold text-center mx-3">Pizza of the Day!</h2>
                <Gem className="w-10 h-10 stroke-teal-500" />
            </div>
            <PizzaCarouselLogic pizzas={pizzas} />
        </div>
    )
}

export default PizzaCarousel;