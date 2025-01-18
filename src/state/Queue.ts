import { Draft, create } from "mutative";

type Song = {
    title: string
    artist: string
    duration: number
    videoId: string;
}

type QueueState = Song[]

const initialState = [
    {
        "title": "Liverpool Street In The Rain",
        "artist": "Mall Grab",
        "duration": 333,
        "videoId": "IxQHHqqtd0M"
    },
    {
        "title": "Nikes",
        "artist": "Frank Ocean",
        "duration": 315,
        "videoId": "fahxSXoXlsA"
      }
  ]

// export getInitialState

export const addToQueue = create((draft: Draft<QueueState>, song: Song) => {
    draft.push(song)
}, { enablePatches: true })