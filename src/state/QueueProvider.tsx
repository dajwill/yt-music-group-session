import { QueueContext, QueueDispatchContext, QueuePatchesContext } from "./QueueContext"
import { useMutativeReducer } from "use-mutative";
import { INIT_STATE, queueReducer } from "./Queue";
import { PropsWithChildren } from "react";



const QueueProvider = ({ children }: PropsWithChildren) => {
    const [state, dispatch, patches] = useMutativeReducer(
        queueReducer,
        INIT_STATE,
        undefined,
        { enablePatches: true }
    );

    return (
        <QueueContext.Provider value={state}>
            <QueueDispatchContext.Provider value={dispatch}>
                <QueuePatchesContext.Provider value={patches}>
                    {children}
                </QueuePatchesContext.Provider>
            </QueueDispatchContext.Provider>
        </QueueContext.Provider>
    )
}

export default QueueProvider;