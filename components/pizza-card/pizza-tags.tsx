import { PizzaTagType } from "@/lib/types";
import PizzaTagItem from "./pizza-tag-item";

type PizzaTagsProps = {
    tags: PizzaTagType['name'][];
    onClick?: (tagName: PizzaTagType['name']) => void;
}

const PizzaTags = ({ tags, onClick }: PizzaTagsProps) => {
    if (!tags || tags.length === 0) return null;
    return (
        <div className="flex gap-2 flex-wrap">
            {tags.map(tag => <PizzaTagItem key={tag} tag={tag} onClick={onClick} />)}
        </div>
    )
}

export default PizzaTags;