import { QueueAction, QueueState, queueReducer } from "../Queue"

const currentUser = 1
const initialState = {
  users: [
    { id: 1 },
    { id: 2 },
  ],
  currentUser,
  songs: [
    {
      "title": "Liverpool Street In The Rain",
      artists: [
        {
          "name": "Mall Grab",
          "id": "UCEjft9l_W9IkW7_71Jz8YIA"
        }
      ],
      thumbnails: [
        {
          "url": "https://lh3.googleusercontent.com/19y8nbouGDVk9Sg2SMGPdXItwY0OLHsE59egweO4FlHjtHGrhxgri2XVoOl7Bp4L0ZA9QjLMV6HyYBTR=w60-h60-l90-rj",
          "width": 60,
          "height": 60
        },
        {
          "url": "https://lh3.googleusercontent.com/19y8nbouGDVk9Sg2SMGPdXItwY0OLHsE59egweO4FlHjtHGrhxgri2XVoOl7Bp4L0ZA9QjLMV6HyYBTR=w120-h120-l90-rj",
          "width": 120,
          "height": 120
        }
      ],
      "duration": 333,
      "videoId": "IxQHHqqtd0M",
      isExplicit: false,
      owner: 1
    },
    {
      "title": "Nikes",
      atrists: [
        {
          "name": "Frank Ocean",
          "id": "UCETYiBLjt2v-pcKSgf8pe6g"
        }
      ],
      thumbnails: [
        {
          "url": "https://lh3.googleusercontent.com/TWBi2M7D8gIwoo3NmhGfoVKI-PuzDunLVYpmLCbeP8Uw2YWpnjttlxmVvpVaO8uSjmLPjHgy6iGXxlPF=w60-h60-l90-rj",
          "width": 60,
          "height": 60
        },
        {
          "url": "https://lh3.googleusercontent.com/TWBi2M7D8gIwoo3NmhGfoVKI-PuzDunLVYpmLCbeP8Uw2YWpnjttlxmVvpVaO8uSjmLPjHgy6iGXxlPF=w120-h120-l90-rj",
          "width": 120,
          "height": 120
        }
      ],
      "duration": 315,
      "videoId": "fahxSXoXlsA",
      isExplicit: true,
      owner: 2,
    }
  ]
} as QueueState

const song = {
  "title": "Bag Getter",
  artists: [
    {
      "name": "Target Demographic",
      "id": "UCMDqZ28RbQEFOgyhzJmAJuA"
    }
  ],
  thumbnails: [
    {
      "url": "https://lh3.googleusercontent.com/uvGIm4WKe1U7fOOBf4v-9WjPiYK_VQpTZjOfOUN_rPgfCLlfS-5dSaF-JGpZeqa4scHTRoeI7Ua3SCT8CQ=w60-h60-l90-rj",
      "width": 60,
      "height": 60
    },
    {
      "url": "https://lh3.googleusercontent.com/uvGIm4WKe1U7fOOBf4v-9WjPiYK_VQpTZjOfOUN_rPgfCLlfS-5dSaF-JGpZeqa4scHTRoeI7Ua3SCT8CQ=w120-h120-l90-rj",
      "width": 120,
      "height": 120
    }
  ],
  isExplicit: true,
  "duration": 274,
  "videoId": "2_CnPJh67WA"
}

describe('queueReducer', () => {
  it('adds a song to the queue', () => {
    const nextState = queueReducer(initialState, {
      type: QueueAction.addToQueue,
      payload: song
    })
    expect(nextState).toStrictEqual({
      ...initialState,
      songs: [
        ...initialState.songs,
        { ...song, owner: currentUser }
      ]
    })
  })

  it('removes a song you added', () => {
    const nextState = queueReducer(initialState, {
      type: QueueAction.removeSong,
      payload: "IxQHHqqtd0M"
    });
    expect(nextState).toStrictEqual({
      ...initialState,
      songs: [initialState.songs[1]]
    })
  });

  it('does not remove a song you did not add', () => {
    const nextState = queueReducer(initialState, {
      type: QueueAction.removeSong,
      payload: 'fahxSXoXlsA'
    })
    expect(nextState).toStrictEqual(initialState)
  });

  it('clears the queue', () => {
    const nextState = queueReducer(initialState, {
      type: QueueAction.clearQueue
    });
    expect(nextState.songs.length).toBe(0)
  })
});