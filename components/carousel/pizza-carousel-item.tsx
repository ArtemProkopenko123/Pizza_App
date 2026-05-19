"use client"
import { PizzaType } from "@/lib/types";
import Image from "next/image";
import { IMAGE_HEIGHT, IMAGE_WIDTH } from "./contants";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

const PizzaCarouselItem = ({ pizza }: { pizza: PizzaType }) => {
    const router = useRouter();
    const onClick = useCallback(() => {
        router.push(`/menu/${pizza.id}`);
    }, [pizza.id]);
    return (
        <div key={pizza.id} className="shrink-0 cursor-pointer" onClick={onClick}>
            <Image src={pizza.image_url} alt={pizza.name} width={IMAGE_WIDTH} height={IMAGE_HEIGHT} loading='eager' />
        </div>
    )
}

export default PizzaCarouselItem;