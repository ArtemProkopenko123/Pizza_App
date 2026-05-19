"use client"
import { useCartStore } from "@/store/cart.store";
import { PizzaSize } from "@/utils/constants";
import { Minus, Plus } from "lucide-react"

type QuantitySelectProps = {
    id: number;
    size: PizzaSize;
    quantity: number;
}
const QuantitySelect = ({ id, size, quantity }: QuantitySelectProps) => {
    const updateQuantity = useCartStore(state => state.updateQuantity);
    return (
        <div className="flex items-center gap-2 bg-green-100 rounded-md w-fit p-1">
            <div onClick={() => updateQuantity(id, size, quantity - 1)} className="cursor-pointer text-gray-500 hover:text-gray-700">
                <Minus className="w-4 h-4" />
            </div>
            <span className="text-1xl font-bold text-center w-6">{quantity}</span>
            <div onClick={() => updateQuantity(id, size, quantity + 1)} className="cursor-pointer text-gray-500 hover:text-gray-700 ">
                <Plus className="w-4 h-4" />
            </div>
        </div>
    )

}

export default QuantitySelect;