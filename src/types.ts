export type Song = {
    title: string
    artists: { name: string, id: string}[]
    thumbnails: { height: number, width: number, url: string }[]
    duration: number
    videoId: string
    isExplicit: boolean
}