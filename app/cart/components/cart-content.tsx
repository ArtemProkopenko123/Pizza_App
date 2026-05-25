"use client";

import Button from "@/components/shared/button";
import { useCartStore } from "@/store/cart.store";
import CartItem from "./cart-item";
import { useRouter } from "next/navigation";

const CartContent = () => {
    const { items, totalItems, totalPrice, removeItem } = useCartStore();
    const router = useRouter();

    const handleCheckout = () => {
        router.push("/checkout");
    }

    if (items.length === 0)  return <div>Your cart is empty</div>;

    return (
        <div style={{ maxWidth: "600px" }}>
            <h2 className="text-2xl font-bold text-center mb-3">Cart</h2>
            <div className="flex flex-col gap-4">
                {items.map((item) => <CartItem key={item.id + item.size} item={item} />)}
            </div>
            <div className="my-2 grid grid-cols-2 gap-2">
                <span className="text-2xl font-bold">Total items:</span>
                <span className="text-2xl font-bold text-right">{totalItems()}</span>
                <span className="text-2xl font-bold">Total price:</span>
                <span className="text-2xl font-bold text-right">{totalPrice()} UAH</span>
            </div>
            <Button className="w-full h-10" onClick={handleCheckout}>Checkout</Button>
        </div>
    )
}

export default CartContent;