import { Dispatch, createContext } from "react";
import { QueueAction, QueueState } from "./queueStore";

export const QueueContext = createContext({} as QueueState);
export const QueueDispatchContext = createContext<Dispatch<{type: QueueAction, payload?: any}>>(() => {});
export const QueuePatchesContext = createContext(null);