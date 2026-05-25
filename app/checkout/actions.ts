"use server"

export async function submitOrder(data: {
    name: string;
    phone: string;
    address: string;
    comment?: string;
}) {
    // simulate backend submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Order received:", data);
    return { success: true };
}