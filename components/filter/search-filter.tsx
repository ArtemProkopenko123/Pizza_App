"use client";

import TextInput from "../shared/text-input";
import { useFilterStore } from "@/store/filter.store";

const SearchFilter = () => {
    const query = useFilterStore(state => state.query);
    const setQuery = useFilterStore(state => state.setQuery);

    return (
        <div>
            <TextInput
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search"
            />
        </div>
    )
}

export default SearchFilter;