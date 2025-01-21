import { QueueContext, QueueDispatchContext } from "@/state/QueueContext"
import { useContext } from "react"

const useQueue = () => {
    const state = useContext(QueueContext)
    const dispatch = useContext(QueueDispatchContext);

    return {
        state,
        dispatch
    };
}

export default useQueue;