import { getPizzaTags } from "@/lib/pizzas";
import FilterTags from "./filter-tags";

const FilterTagsMain = async () => {
    const tags = await getPizzaTags();
    return (
        <FilterTags tags={tags.map(tag => tag.name)} />
    )
}

export default FilterTagsMain;