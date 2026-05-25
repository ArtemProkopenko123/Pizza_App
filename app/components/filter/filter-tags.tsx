"use client";

import PizzaTagItem from "@/components/pizza-card/pizza-tag-item";
import { PizzaTagType } from "@/lib/types";
import { ListFilter, Loader2, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

type FilterTagsProps = {
    tags: PizzaTagType['name'][];
}
const FilterTags = ({ tags }: FilterTagsProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const selectedTag = searchParams.get('tag');
    const [isPending, startTransition] = useTransition();

    const handleTagClick = (tag: PizzaTagType['name']) => {
        startTransition(() => router.push(`?tag=${tag}`));
    };

    const handleClearClick = () => {
        startTransition(() => router.push('?'));
    };

    return (
        <div className={`flex gap-2 flex-wrap transition-opacity ${isPending ? 'opacity-50 pointer-events-none' : ''}`}>
            {selectedTag ? <X className="cursor-pointer" onClick={handleClearClick} /> : <ListFilter className="cursor-pointer" />}
            {tags.map((tag) => <PizzaTagItem key={tag} tag={tag} selected={tag === selectedTag} onClick={handleTagClick} />)}
        </div>
    )
}

export default FilterTags;