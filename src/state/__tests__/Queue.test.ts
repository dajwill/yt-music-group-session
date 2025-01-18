import { addToQueue } from "../Queue"

// const initialState = {
//   users: [
//     {
//       id: 1,
//       name: "Test user"
//     },
//     {
//       id: 2,
//       name: "Someone else"
//     }
//   ],
//   currentUser: {
//     id: 1,
//     name: "Test user"
//   },
//   queue: [
//     {
//         "title": "Liverpool Street In The Rain",
//         "artist": "Mall Grab",
//         "duration": 333,
//         "videoId": "IxQHHqqtd0M"
//     },
//     {
//         "title": "Nikes",
//         "artist": "Frank Ocean",
//         "duration": 315,
//         "videoId": "fahxSXoXlsA"
//       }
//   ]
// }

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

const song = {
    "title": "Bag Getter",
    "artist": "Target Demographic",
    "duration": 274,
    "videoId": "2_CnPJh67WA"
}

describe("Adding a gift", () => {
  const nextState = addToQueue(initialState, song)
  const [state, patches, inversePatches] = nextState
  console.log({
    state,
    patches,
    inversePatches
  })

  test("added a gift to the collection", () => {
    expect(nextState.length).toBe(3)
  })

  test("didn't modify the original state", () => {
    expect(initialState.length).toBe(2)
  })
})

// describe("Shuffle Queue", () => {
//   const nextState = shuffle(initialState)

//   test("correctly stores reservedBy", () => {
//     expect(nextState.gifts[1].reservedBy).toBe(1) // Test user
//   })

//   test("didn't the original state", () => {
//     expect(initialState.queue[0].reservedBy).toBe(undefined)
//   })
// })
