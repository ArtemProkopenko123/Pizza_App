'use client'

import { FormProvider, useForm } from "react-hook-form";
import { FormDataType, formValidation } from "../helpers/form-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/shared/button";
import { submitOrder } from "../actions";
import { useTransition } from "react";
import { DeliveryType, PaymentType } from "../helpers/contants";
import TextInput from "@/components/shared/text-input";
import TextArea from "@/components/shared/text-area";
import SelectField from "@/components/shared/select-field";
import { Banknote, Check, Mail, MapPin, MessageCircleMore, PackageCheck, Phone } from "lucide-react";
import FormIcon from "./form-icon";


type Props = {
    onSuccess: () => void;
    onError: (error: Error) => void;
}

const CheckoutForm = ({ onSuccess, onError }: Props) => {
    const [isPending, startTransition] = useTransition();
    const methods = useForm<FormDataType>({
        resolver: zodResolver(formValidation),
        defaultValues: {
            deliveryType: DeliveryType.DELIVERY,
            paymentType: PaymentType.CASH,
        },
    });
    const { formState: { errors }, register, handleSubmit } = methods;
    const onSubmit = async (data: FormDataType) => {
        startTransition(async () => {
            try {
               const res = await submitOrder(data);
               if (res.success) {
                onSuccess();
               }
            } catch (error) {
                onError(error as Error);
            }
        });
    };
    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-4 max-w-md">

                    <TextInput.Field label="Name" required error={errors.name?.message}>
                        <TextInput variant="filled" {...register("name")} type="text" placeholder="Name" />
                    </TextInput.Field>

                    <TextInput.Field label={<><FormIcon Icon={Phone} /> Phone</>} required error={errors.phone?.message}>
                        <TextInput variant="filled" {...register("phone")} type="text" placeholder="Phone" />
                    </TextInput.Field>

                    <TextInput.Field label={<><FormIcon Icon={Mail} /> Email</>} required error={errors.email?.message}>
                        <TextInput variant="filled" {...register("email")} type="email" placeholder="Email" />
                    </TextInput.Field>

                    <TextInput.Field label={<><FormIcon Icon={MapPin} /> Address</>} required error={errors.address?.message}>
                        <TextInput variant="filled" {...register("address")} type="text" placeholder="Address" />
                    </TextInput.Field>

                    <TextArea.Field label={<><FormIcon Icon={MessageCircleMore} /> Comment</>} error={errors.comment?.message}>
                        <TextArea variant="filled" resize="vertical" {...register("comment")} placeholder="Comment" />
                    </TextArea.Field>

                    <SelectField.Field label={<><FormIcon Icon={PackageCheck} /> Delivery Type</>} required error={errors.deliveryType?.message}>
                        <SelectField variant="filled" {...register("deliveryType")}>
                            <SelectField.Option value={DeliveryType.DELIVERY}>Delivery</SelectField.Option>
                            <SelectField.Option value={DeliveryType.PICKUP}>Pickup</SelectField.Option>
                        </SelectField>
                    </SelectField.Field>

                    <SelectField.Field label={<><FormIcon Icon={Banknote} /> Payment Type</>} required error={errors.paymentType?.message}>
                        <SelectField variant="filled" options={[
                            { value: PaymentType.CASH, label: "Cash" },
                            { value: PaymentType.CARD, label: "Card" },
                        ]} {...register("paymentType")} />
                    </SelectField.Field>

                    <Button type="submit" disabled={isPending} className="w-full"><Check className="inline-block mr-2"/>{isPending ? "Processing..." : "Submit"}</Button>
                </div>
            </form>
        </FormProvider>
    )
}

export default CheckoutForm;