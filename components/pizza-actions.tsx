"use client"
import { Pizza } from "@/lib/pizzas";
import AddToCartButton from "@/components/add-to-cart-button";
import SizeSelect from "@/components/size-select";
import { useState } from "react";
import { DEFAULT_PIZZA_SIZE, PizzaSize } from "@/utils/constants";


const PizzaActions = ({ pizza }: { pizza: Pizza }) => {
    const [size, setSize] = useState<PizzaSize>(DEFAULT_PIZZA_SIZE);
    return (
        <>
            <SizeSelect inline currentSize={size} setSize={setSize} />
            <AddToCartButton pizza={pizza} size={size} />
        </>
    );
};

export default PizzaActions;