"use client";
import { PizzaTagType } from "@/lib/types";

type PizzaTagItemProps = {
    tag: PizzaTagType['name'];
    selected?: boolean;
    onClick?: (tagName: PizzaTagType['name']) => void;
}

const PizzaTagItem = ({ tag, selected, onClick }: PizzaTagItemProps) => {
    return (
        <span onClick={() => onClick?.(tag)} className={`text-xs ${selected ? 'bg-red-100 text-red-700' : 'bg-teal-100 text-teal-700'} px-2 py-1 rounded-full ${!onClick ? 'cursor-default' : 'cursor-pointer hover:bg-teal-200'}`}>
            {tag}
        </span>
    )
}

export default PizzaTagItem;