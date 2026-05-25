"use client"
import { PizzaType } from "@/lib/types";
import AddToCartButton from "@/components/pizza-card/add-to-cart-button";
import SizeSelect from "./size-select";
import { useState } from "react";
import { DEFAULT_PIZZA_SIZE, PizzaSize } from "@/utils/constants";
import usePizzaPrice from "@/utils/hooks/use-pizza-price";
import PizzaWeight from "./pizza-weight";


const PizzaActions = ({ pizza }: { pizza: PizzaType }) => {
    const [size, setSize] = useState<PizzaSize>(DEFAULT_PIZZA_SIZE);
    const price = usePizzaPrice(pizza.price_uah, size);
    return (
        <>
            <PizzaWeight weight={pizza.weight_g} size={size} />
            <SizeSelect inline currentSize={size} setSize={setSize} />
            <div className="flex items-center gap-4">
                <p className="text-2xl font-bold">{price} UAH</p>
                <AddToCartButton pizza={pizza} size={size} />
            </div>

        </>
    );
};

export default PizzaActions;
