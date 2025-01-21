import { useCallback } from "react";
import { useLocation, useSearch } from "wouter";

const useToggleQueueDisplay = () => {
    const [location, navigate] = useLocation();
    const searchParams = useSearch();
    const getPrevPath = useCallback(() => {
        return !!searchParams ? `${location}?${searchParams}` : location
    }, [location, searchParams]);

    return location === '/queue' ?
        () => navigate(window.history.state?.prevPath ?? '/') :
        () => navigate('/queue', { state: { prevPath: getPrevPath() }})
}

export default useToggleQueueDisplay;