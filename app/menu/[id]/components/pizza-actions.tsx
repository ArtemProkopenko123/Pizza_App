"use client"
import { Pizza } from "@/lib/pizzas";
import AddToCartButton from "@/components/pizza-card/add-to-cart-button";
import SizeSelect from "./size-select";
import { useState } from "react";
import { DEFAULT_PIZZA_SIZE, PizzaSize } from "@/utils/constants";
import usePizzaPrice from "@/utils/hooks/use-pizza-price";


const PizzaActions = ({ pizza }: { pizza: Pizza }) => {
    const [size, setSize] = useState<PizzaSize>(DEFAULT_PIZZA_SIZE);
    const price = usePizzaPrice(pizza.price_uah, size);
    return (
        <>
            <SizeSelect inline currentSize={size} setSize={setSize} />
            <div className="flex items-center gap-4">
                <p className="text-2xl font-bold">{price} грн</p>
                <AddToCartButton pizza={pizza} size={size} />
            </div>

        </>
    );
};

export default PizzaActions;
