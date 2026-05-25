import { create } from "zustand";

type FilterStore = {
    query: string;
    setQuery: (query: string) => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
    query: '',
    setQuery: (query) => set({ query }),
}));
