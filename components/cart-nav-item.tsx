"use client";
import { useCartStore } from "@/store/cart.store";
import Link from "next/link";

const CartNavItem = () => {
    const totalCount = useCartStore(state => state.items.reduce((acc, i) => acc + i.quantity, 0));
    return (
        <Link href="/cart" className="text-white  p-2 hover:text-black transition-colors duration-500">
            🛒 Cart
            {totalCount > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 inline-flex items-center justify-center ml-1">
                    {totalCount}
                </span>
            )}
        </Link>
    )
}

export default CartNavItem;