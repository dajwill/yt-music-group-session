import useQueue from "./useQueue"

const useCurrentSong = () => {
    const { state } = useQueue();
    return state.songs?.[state.nowPlaying]
};

export default useCurrentSong;