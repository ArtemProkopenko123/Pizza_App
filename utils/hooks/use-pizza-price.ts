import { PIZZA_SIZE_MULTIPLIER, PizzaSize } from "../constants";
import { useMemo } from "react";

const usePizzaPrice = (price: number, size: PizzaSize) => {
    return useMemo(
        () => Math.round(price * PIZZA_SIZE_MULTIPLIER[size]),
        [price, size]
    );
}

export default usePizzaPrice;