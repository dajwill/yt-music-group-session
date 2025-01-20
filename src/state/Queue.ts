import { Song } from '@/types'
import { Draft, create } from 'mutative'

interface QueueSong extends Song {
    owner: number
}

export type QueueState = {
    currentUser: number
    users: { id: number }[],
    songs: QueueSong[]
}

export enum QueueAction {
    addToQueue = 'ADD_TO_QUEUE',
    removeSong = 'REMOVE_SONG',
    clearQueue = 'CLEAR_QUEUE'
}

export const addToQueue = create((draft: Draft<QueueState>, song: Song, userId: number) => {
    draft.songs.push({
        ...song,
        owner: userId
    })
})

export const removeSong = create((draft: Draft<QueueState>, songId: Song['videoId'], userId: number) => {
    const songToRemove = draft.songs.findIndex(song => song.videoId === songId && song.owner === userId)
    if (songToRemove >=0 )draft.songs.splice(songToRemove, 1)
})

export const clearQueue = create((draft: Draft<QueueState>) => {
    draft.songs = []
})

export const queueReducer = create((draft: Draft<QueueState>, action: { type: QueueAction, payload?: any }) => {
    switch (action.type) {
        case QueueAction.addToQueue:
            draft.songs.push({
                ...action.payload,
                owner: draft.currentUser
            })
            break;
        case QueueAction.removeSong:
            const songToRemove = draft.songs.findIndex(song => song.videoId === action.payload && song.owner === draft.currentUser)
            if (songToRemove >=0 ) draft.songs.splice(songToRemove, 1)
            break;
        case QueueAction.clearQueue:
            draft.songs = [];
            break;
    }
})