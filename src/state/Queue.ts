import { Song } from '@/types'
import { Draft, create } from 'mutative'

interface QueueSong extends Song {
    owner: number
}

export type QueueState = {
    currentUser: number
    users: { id: number }[]
    songs: QueueSong[]
    nowPlaying: number
}

export enum QueueAction {
    addToQueue = 'ADD_TO_QUEUE',
    removeSong = 'REMOVE_SONG',
    clearQueue = 'CLEAR_QUEUE',
    next = 'NEXT_SONG',
    previous = 'PREVIOUS_SONG',
    skipTo = 'SKIP_TO'
}

export const INIT_STATE = {
    currentUser: 1,
    users: [],
    songs: [],
    nowPlaying: 0
}

export const addToQueue = create((draft: Draft<QueueState>, song: Song, userId: number) => {
    draft.songs.push({
        ...song,
        owner: userId
    })
})

export const removeSong = create((draft: Draft<QueueState>, songId: Song['videoId'], userId: number) => {
    const songToRemove = draft.songs.findIndex(song => song.videoId === songId && song.owner === userId)
    if (songToRemove >= 0 )draft.songs.splice(songToRemove, 1)
})

export const clearQueue = create((draft: Draft<QueueState>) => {
    draft.songs = []
})

export const reducer = (draft: Draft<QueueState>, action: { type: QueueAction, payload?: any }) => {
    switch (action.type) {
        case QueueAction.addToQueue:
            if (!draft.songs.length) draft.nowPlaying = 0
            draft.songs.push({
                ...action.payload,
                owner: draft.currentUser
            })
            break;
        case QueueAction.removeSong:
            // const songToRemove = draft.songs.findIndex(song => song.videoId === action.payload && song.owner === draft.currentUser)
            if (draft.songs[action.payload].owner === draft.currentUser ) draft.songs.splice(action.payload, 1)
            break;
        case QueueAction.clearQueue:
            draft.nowPlaying = 0
            draft.songs = [];
            break;
        case QueueAction.next:
            console.log('in the reducer')
            if (draft.songs.length && (draft.nowPlaying < draft.songs.length - 1)) {
                console.log('conditional')
                draft.nowPlaying++
            }
            break;
        case QueueAction.previous:
            draft.nowPlaying = draft.nowPlaying ? --draft.nowPlaying : 0
            break;
        case QueueAction.skipTo:
            draft.nowPlaying = action.payload
            break;
    }
}

export const queueReducer = create(reducer)
export const patchingQueueReducer = create(reducer, { enablePatches: true });
