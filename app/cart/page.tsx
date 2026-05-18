import CartContent from "@/app/cart/components/cart-content";

export const metadata = { title: "Корзина — PizzaFast" };

export default function CartPage() {
    return (<>
        <h2 className="text-4xl font-bold text-center mb-3">Cart</h2>
        <CartContent />
    </>);
}
