import Tooltip from "@/components/shared/tooltip";
import { CopyMinus } from "lucide-react";
import Image from "next/image";
import { CartItemType, useCartStore } from "@/store/cart.store";
import QuantitySelect from "./quantity-select";

type CartItemProps = {
    item: CartItemType;
}

const CartItem = ({item}: CartItemProps) => {
    const removeItem = useCartStore(store => store.removeItem);
    return (
        <div key={item.id + item.size} className="grid grid-cols-[100px_1fr] gap-4 border-b border-gray-200 pb-4"    >
            <Image src={item.image_url} alt={item.name} width={100} height={100} loading="eager" className="my-auto" />
            <div>
                <div className="flex items-center justify-between gap-2">
                    <h3 className="text-lg font-bold">{item.name}</h3>
                    <Tooltip content="Remove from cart">
                        <CopyMinus onClick={() => removeItem(item.id, item.size)} className="cursor-pointer text-gray-500 hover:text-gray-700 w-5 h-5" />
                    </Tooltip>
                </div>
                <p>{item.size} см</p>
                <QuantitySelect id={item.id} size={item.size} quantity={item.quantity} />
                <p className="text-lg font-bold">{item.price_uah} грн</p>
            </div>
        </div>
    )
}
export default CartItem;