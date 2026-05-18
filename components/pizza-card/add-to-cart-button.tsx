"use client"
import Button from "@/components/shared/button";
import { Pizza } from "@/lib/pizzas";
import { useCartStore } from "@/store/cart.store";
import { DEFAULT_PIZZA_SIZE, PizzaSize } from "@/utils/constants";

type Props = {
    pizza: Pizza;
    size?: PizzaSize;
}

const AddToCartButton = ({ pizza, size = DEFAULT_PIZZA_SIZE }: Props) => {
    const addItem = useCartStore(state => state.addItem);
    const handleAddToCart = () => {
        addItem(pizza, size);
    }
    return (
        <Button onClick={handleAddToCart}>+ Add to Cart</Button>
    );
};

export default AddToCartButton;