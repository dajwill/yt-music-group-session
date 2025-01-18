import { useSearch } from "wouter";

const useSearchValue = () => {
    const searchString = useSearch();
    const searchParams = new URLSearchParams(searchString);
    return searchParams.get('q') ?? ''
}

export default useSearchValue