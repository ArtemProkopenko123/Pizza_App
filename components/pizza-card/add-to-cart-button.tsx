"use client"
import Button from "@/components/shared/button";
import { PizzaType } from "@/lib/types";
import { useCartStore } from "@/store/cart.store";
import { DEFAULT_PIZZA_SIZE, PizzaSize } from "@/utils/constants";
import { Plus } from "lucide-react";

type Props = {
    pizza: PizzaType;
    size?: PizzaSize;
}

const AddToCartButton = ({ pizza, size = DEFAULT_PIZZA_SIZE }: Props) => {
    const addItem = useCartStore(state => state.addItem);
    const handleAddToCart = () => {
        addItem(pizza, size);
    }
    return (
        <Button onClick={handleAddToCart} className="flex items-center gap-2"><Plus className="inline w-4 h-4" /> Add to Cart</Button>
    );
};

export default AddToCartButton;