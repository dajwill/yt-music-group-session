import { Draft } from "mutative";
import { useMutativeReducer } from "use-mutative";

type User = {
    id: string
    name?: string;
    owner: boolean;
}

type Song = {
    title: string
    artist: string
    duration: number
    videoId: string;
}

type QueueState = {
    users: User[]
    queue: Song[]
};

type ActionType = "addToQueue" | "clearQueue" | "removeSong"

type ActionPayload = {
    song?: Song
    index?: number
}

const INIT_STATE = {
    users: [],
    queue: []
}

const reducer = (
    draft: Draft<QueueState>,
    action: { type: ActionType } & any
) => {
    switch (action.type) {
        case 'addToQueue':
            return void draft.queue.push(action.song)
        case 'clearQueue':
            return {
                ...draft,
                queue: []
            };
        case 'removeSong':
            return void draft.queue.splice(action.index, action.index || 1)
    }
}

const useQueue = () => useMutativeReducer(
    reducer,
    INIT_STATE,
    undefined,
    { enablePatches: true }
)

export default useQueue;