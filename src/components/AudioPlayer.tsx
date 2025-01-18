import { Box, Grid, GridItem, Icon, Image, Stack, Text } from "@chakra-ui/react";
import { useRef, useState, ChangeEvent } from "react"
import { Slider, SliderProps } from "@/components/ui/slider";
import { MdSkipPrevious, MdSkipNext, MdPlayArrow, MdPause, MdExplicit } from "react-icons/md";
import formatTime from "@/utils/formatTime";

interface IAudioPlayer extends SliderProps {
    src: string
}

type PlayControl = {
    isPlaying: boolean;
    onTogglePlayState: () => void
}

const Controls = ({ isPlaying, onTogglePlayState }: PlayControl) => (
    <Stack direction="row" align="center" justify="center" maxW="min-content">
        <Icon size="2xl"><MdSkipPrevious /></Icon>
        <Icon fontSize="3.5em" onClick={onTogglePlayState}>{isPlaying ? <MdPause /> : <MdPlayArrow />}</Icon>
        <Icon size="2xl"><MdSkipNext /></Icon>
    </Stack>
)

const song = {
    "category": "Songs",
    "resultType": "song",
    "title": "Relax My Eyes",
    "album": {
        "name": "Relax My Eyes",
        "id": "MPREb_0SxgEpBTQvE"
    },
    "inLibrary": false,
    "feedbackTokens": {
        "add": null,
        "remove": null
    },
    "videoId": "VqPoep6fIkw",
    "videoType": "MUSIC_VIDEO_TYPE_ATV",
    "duration": "3:13",
    "year": null,
    "artists": [
        {
            "name": "ANOTR",
            "id": "UC4J68bGcrU5e1TIdyAi2-Wg"
        },
        {
            "name": "Abel Balder",
            "id": "UCvOE4jkIRy_42iIzvgxStYg"
        }
    ],
    "duration_seconds": 193,
    "isExplicit": false,
    "thumbnails": [
        {
            "url": "https://lh3.googleusercontent.com/JDQAWc5lg25H98nqa4hKaIFouQg_fg8F42Z6AfHyQbi9CEC6qoZt-7fpA1krsb74acw7o8vuwojyYuqsdQ=w60-h60-l90-rj",
            "width": 60,
            "height": 60
        },
        {
            "url": "https://lh3.googleusercontent.com/JDQAWc5lg25H98nqa4hKaIFouQg_fg8F42Z6AfHyQbi9CEC6qoZt-7fpA1krsb74acw7o8vuwojyYuqsdQ=w120-h120-l90-rj",
            "width": 120,
            "height": 120
        }
    ]
}

const AudioPlayer = ({ src, width }: IAudioPlayer) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [mediaTime, setMediaTime] = useState(0);
    const [bufferedAmount, setBufferedAmount] = useState(0)

    const togglePlaying = () => {
        if (!audioRef.current) return;
        setIsPlaying(!isPlaying);
        isPlaying ? audioRef.current.pause() : audioRef.current.play();
    };

    const onLoadedMetadata = () => {
        setDuration(audioRef.current?.duration ?? 0);
    };

    const onTimeUpdate = () => {
        setMediaTime(audioRef.current?.currentTime ?? 0);
    };

    const onScrubberChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (!audioRef.current) return;
        const newTime = Number(event.target.value) || 0;
        setMediaTime(newTime);
        audioRef.current.currentTime = newTime;
    };

    const onProgress = () => {
        if (!audioRef.current) return;
        if (audioRef.current.duration > 0) {
            for (let i = 0; i < audioRef.current.buffered.length; i++) {
                if (
                    audioRef.current.buffered.start(audioRef.current.buffered.length - 1 - i) <
                    audioRef.current.currentTime
                ) {
                    setBufferedAmount(
                        (audioRef.current.buffered.end(audioRef.current.buffered.length - 1 - i) * 100) / duration
                    );
                    break;
                }
            }
        }
    }

    return (
        <Box position="fixed" bottom={0} width="100%" h="100px" zIndex="docked">
            <Slider
                size="xs"
                width="100%"
                position="absolute"
                top={-1}
                colorPalette="red"
                variant="solid"
                value={[mediaTime]}
                max={duration}
                onChange={onScrubberChange}
                bufferedAmount={bufferedAmount}
            />
            <Grid templateColumns="repeat(4, 1fr)" gap="4" h="100%" bg="whiteAlpha.950" px={8}>
                <GridItem as={Stack} colSpan={1}>
                <Stack direction="row" align="center" gapX={4} h="100%" w="100%">
                    <Controls isPlaying={isPlaying} onTogglePlayState={togglePlaying} />
                    <Stack direction="row" justify="space-between" align="center">
                        <Text fontSize="xs">{formatTime(mediaTime)}</Text>
                        /
                        <Text fontSize="xs">{formatTime(duration)}</Text>
                    </Stack>
                </Stack>
                </GridItem>
                <GridItem colSpan={2}>
                    <Stack direction="row" h="100%" w="100%" align="center" justifyContent="center">
                        <Image
                            height="60px"
                            src="https://lh3.googleusercontent.com/JDQAWc5lg25H98nqa4hKaIFouQg_fg8F42Z6AfHyQbi9CEC6qoZt-7fpA1krsb74acw7o8vuwojyYuqsdQ=w120-h120-l90-rj"  
                        />
                        <Stack alignItems="flex-start" minW="350px" gap={0}>
                            <Text fontWeight="semibold">{song.title}</Text>
                            <Stack direction="row" gapX={1}>
                                {song.isExplicit && (
                                    <Icon as={MdExplicit} />
                                )}
                                <Text>{song.artists?.[0].name}</Text>
                                <span>&middot;</span>
                                <Text>{song.duration}</Text>
                            </Stack>
                        </Stack>
                    </Stack>
                </GridItem>
                <GridItem colSpan={1}></GridItem>
            </Grid>
            <audio
                hidden
                ref={audioRef}
                // src="https://www.youtube.com/watch?v=T6eK-2OQtew&ab_channel=KendrickLamar"
                src={src}
                controls
                onLoadedMetadata={onLoadedMetadata}
                onTimeUpdate={onTimeUpdate}
                onProgress={onProgress}
            />
        </Box>
    )
}

export default AudioPlayer;
