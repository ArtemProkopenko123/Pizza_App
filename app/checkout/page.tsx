"use client";
import { useState } from "react";
import CheckoutForm from "@/app/checkout/components/checkout-form";
import Modal from "@/components/shared/modal";
import Button from "@/components/shared/button";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart.store";

const CheckoutPage = () => {
    const clearCart = useCartStore(state => state.clearCart);
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const handleSuccess = () => {
        setIsModalOpen(true);
    }
    const handleError = (error: Error) => {
        console.error(error);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
        clearCart();
        router.push("/");
    }
    return (
        <div>
            <h1 className="text-2xl font-bold text-center">Checkout</h1>
            <CheckoutForm onSuccess={handleSuccess} onError={handleError} />
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <Modal.Header>
                    <h1 className="text-2xl font-bold text-center">Order submitted successfully</h1>
                </Modal.Header>
                <Modal.Body>
                    <p className="text-sm text-center">Thank you for your order. We will contact you soon.</p>
                </Modal.Body>
                <Modal.Footer>
                    <div className="flex justify-center">
                        <Button onClick={handleCloseModal}>Confirm</Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    )

}

export default CheckoutPage;