import { PIZZA_WEIGHT_MULTIPLIER, PizzaSize } from "../constants";
import { useMemo } from "react";

const usePizzaWeight = (weight: number, size: PizzaSize) => {
    return useMemo(
        () => Math.round(weight * PIZZA_WEIGHT_MULTIPLIER[size]),
        [weight, size]
    );
}

export default usePizzaWeight;