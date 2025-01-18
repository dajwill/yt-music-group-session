import axios from 'axios';
import { useQuery } from '@tanstack/react-query'

type SearchParams = {
    q: string
    filter?: string
    limit?: number;
}

type Song = {
    title: string
    artists: { name: string, id: string}[]
    thumbnails: { height: number, width: number, url: string }[]
    duration: number
    videoId: string
    isExplicit: boolean
}

const SearchQuery = async ({ q, filter, limit = 20}: SearchParams): Promise<Song[]> => {
    try {
        const response = await axios.get('https://yt-music-api-d7kt.onrender.com/search', { params: { q, filter, limit }})
        return response.data
    } catch (error) {
        throw error;
    }
};

const useSearch = (params: SearchParams) => useQuery({
    queryKey: ['search', params],
    queryFn: () => SearchQuery(params),
    enabled: !!params.q,
    refetchOnWindowFocus: false,
});

export default useSearch;