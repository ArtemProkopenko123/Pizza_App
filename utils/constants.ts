export enum PizzaSize {
    SMALL = 35,
    MEDIUM = 39,
    LARGE = 42,
}

export const DEFAULT_PIZZA_SIZE: PizzaSize = PizzaSize.MEDIUM;

export const PIZZA_SIZE_MULTIPLIER: Record<PizzaSize, number> = {
    [PizzaSize.SMALL]: 0.8,
    [PizzaSize.MEDIUM]: 1.0,
    [PizzaSize.LARGE]: 1.3,
};