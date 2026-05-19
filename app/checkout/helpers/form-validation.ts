import z from "zod";
import { DeliveryType, PaymentType } from "./contants";

export const formValidation = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    phone: z.string().min(1, { message: "Phone is required" }),
    address: z.string().min(1, { message: "Address is required" }),
    comment: z.string().optional(),
    deliveryType: z.enum(DeliveryType, { message: "Delivery type is required" }),
    paymentType: z.enum(PaymentType, { message: "Payment type is required" }),
});

export type FormDataType = z.infer<typeof formValidation>;