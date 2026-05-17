type PizzaTagsProps = {
    tags: string[];
}

const PizzaTags = ({ tags }: PizzaTagsProps) => {
    if (!tags || tags.length === 0) return null;
    return (
        <div className="flex gap-2 flex-wrap">
            {tags.map(tag => (
                <span key={tag} className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded-full">
                    {tag}
                </span>
            ))}
        </div>
    )
}

export default PizzaTags;