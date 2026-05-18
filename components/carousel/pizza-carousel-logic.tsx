"use client"

import { Pizza } from "@/lib/pizzas";
import PizzaCarouselItem from "./pizza-carousel-item";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";
import { IMAGE_WIDTH, SCROLL_INTERVAL, SCROLL_OFFSET } from "./contants";

type Props = {
    pizzas: Pizza[];
}
const PizzaCarouselLogic = ({ pizzas }: Props) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const directionRef = useRef<1 | -1>(1);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        if(!scrollRef.current) return;
        intervalRef.current = setInterval(() => {
            if(directionRef.current === 1) {
                scrollRef.current?.scrollBy({ left: SCROLL_OFFSET, behavior: 'smooth' });
                if(scrollRef.current?.scrollLeft && scrollRef.current?.scrollLeft + scrollRef.current?.clientWidth >= scrollRef.current?.scrollWidth) {
                    directionRef.current = -1;
                }
            } else {
                scrollRef.current?.scrollBy({ left: -SCROLL_OFFSET, behavior: 'smooth' });
                if(scrollRef.current?.scrollLeft && scrollRef.current?.scrollLeft - SCROLL_OFFSET <= 0) {
                    directionRef.current = 1;
                }
            }
            
        }, SCROLL_INTERVAL);
    
        return () => clearInterval(intervalRef.current!);
    }, []);

    const onClickLeft = useCallback(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -SCROLL_OFFSET, behavior: 'smooth' });
        }
        if(intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    }, []);
    const onClickRight = useCallback(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: SCROLL_OFFSET, behavior: 'smooth' });
        }
        if(intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    }, []);
    return (
        <div className="relative flex items-center">
            <button onClick={onClickLeft} className="absolute left-[-30px] top-0 bottom-0 cursor-pointer"> <ChevronLeft className="w-10 h-10" /></button>
            <div
                ref={scrollRef}
                className="flex overflow-x-hidden gap-4 scroll-smooth"
            >
                {pizzas.map((pizza) => (
                    <PizzaCarouselItem key={pizza.id} pizza={pizza} />
                ))}
            </div>
            <button onClick={onClickRight} className="absolute right-[-30px] top-0 bottom-0 cursor-pointer"> <ChevronRight className="w-10 h-10" /></button>
        </div>
    )

}

export default PizzaCarouselLogic;