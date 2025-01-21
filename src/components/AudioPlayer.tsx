import { Box, Grid, GridItem, Icon, Image, Presence, Stack, Text } from "@chakra-ui/react";
import { useRef, useState, ChangeEvent, useCallback, MouseEventHandler, useEffect } from "react"
import { Slider, SliderProps } from "@/components/ui/slider";
import { MdSkipPrevious, MdSkipNext, MdPlayArrow, MdPause, MdExplicit } from "react-icons/md";
import { LuShuffle } from "react-icons/lu";
import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";
import formatTime from "@/utils/formatTime";
import useQueue from "@/hooks/useQueue";
import { QueueAction } from "@/state/queueStore";
import { useColorModeValue } from "./ui/color-mode";
import { useLocation } from 'wouter';
import useToggleQueueDisplay from "@/hooks/useToggleQueueDisplay";

interface IAudioPlayer extends SliderProps {
    src: string
}

type PlayControl = {
    isPlaying: boolean;
    onTogglePlayState: () => void;
    onNext?: () => void;
    onPrevious: () => void;
}

const Controls = ({ isPlaying, onTogglePlayState, onNext, onPrevious }: PlayControl) => (
    <Stack direction="row" align="center" justify="center" maxW="min-content" onClick={e => e.stopPropagation()}>
        <Icon size={['lg','2xl']} onClick={onPrevious} hideBelow="md"><MdSkipPrevious /></Icon>
        <Icon fontSize={['2.5em', '3.5em']} onClick={onTogglePlayState}>{isPlaying ? <MdPause /> : <MdPlayArrow />}</Icon>
        <Icon size={['lg','2xl']} onClick={onNext} color={onNext ? undefined : "dimgrey"}><MdSkipNext /></Icon>
    </Stack>
);

const QueueDisplayIndicator = () => {
    const [location] = useLocation();

    return <Icon size="2xl" as={location === '/queue' ? AiOutlineCaretDown : AiOutlineCaretUp}  />
}

const ShuffleButton = () => {
    const { dispatch } = useQueue()
    const onClick: MouseEventHandler<SVGSVGElement> = (e) => {
        e.stopPropagation()
        dispatch({ type: QueueAction.shuffle })
    }
    return <Icon as={LuShuffle} size="2xl" onClick={onClick} />
}

const AudioPlayer = ({ src, width }: IAudioPlayer) => {
    const { state, dispatch } = useQueue();
    const currentSong = state.songs?.[state.nowPlaying];
    const bg = useColorModeValue('whiteAlpha.950', 'blackAlpha.950');
    const toggleQueueDisplay = useToggleQueueDisplay();
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [mediaTime, setMediaTime] = useState(0);
    const [bufferedAmount, setBufferedAmount] = useState(0);

    useEffect(() => {
        if (!audioRef.current) return;
        audioRef.current.currentTime = 0;
    }, [currentSong])

    const onPrevious = useCallback(() => {
        if (state.nowPlaying) {
            return void dispatch({ type: QueueAction.previous })
        }
        if (audioRef.current) audioRef.current.currentTime = 0
    }, [dispatch, state.nowPlaying]);

    const onNext = useCallback(() => {
        dispatch({ type: QueueAction.next })
    }, [dispatch]);

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
        <Presence
          position="fixed"
          bottom="0"
          insetX="0"
          present={!!state.songs.length}
          animationName={{
            _open: "slide-from-bottom-full",
            _closed: "slide-to-bottom-full",
          }}
          animationDuration="moderate"
          zIndex="docked"
        >
            <Box
                width="100%"
                h="100px"
                onClick={toggleQueueDisplay}
            >
                <span onClick={e => e.stopPropagation()}>
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
                </span>
                <Grid templateColumns={{ base: "repeat(5, 1fr)", md: "repeat(4, 1fr)"}} gap={[1,4]} h="100%" bg={bg} px={[4,8]}>
                    <GridItem colSpan={1} order={{base: 2, md: 0}}>
                        <Stack direction="row" align="center" gapX={4} h="100%" w="100%">
                            <Controls isPlaying={isPlaying} onTogglePlayState={togglePlaying} onNext={(state.nowPlaying < state.songs.length - 1)  ? onNext : undefined} onPrevious={onPrevious} />
                            <Stack direction="row" justify="space-between" align="center" hideBelow="lg">
                                <Text fontSize="xs">{formatTime(mediaTime)}</Text>
                                /
                                <Text fontSize="xs">{formatTime(duration)}</Text>
                            </Stack>
                        </Stack>
                    </GridItem>
                    <GridItem colSpan={{base: 4, md: 2}}>
                        <Stack direction="row" h="100%" w="100%" align="center" justifyContent={['flex-start', "center"]}>
                            <Image
                                height="60px"
                                src={currentSong?.thumbnails[1].url}
                            />
                            <Stack minW={['100px', '175px', '350px']} justify="center" gap={0}>
                                <Text fontWeight="semibold" fontSize="sm" truncate>{currentSong?.title}</Text>
                                <Stack direction="row" gapX={1}>
                                    {currentSong?.isExplicit && (
                                        <Icon as={MdExplicit} />
                                    )}
                                    <Text fontSize="sm" truncate>{currentSong?.artists?.[0].name}</Text>
                                    <span>&middot;</span>
                                    <Text>{currentSong?.duration}</Text>
                                </Stack>
                            </Stack>
                        </Stack>
                    </GridItem>
                    <GridItem colSpan={[0, 1]} hideBelow="md">
                        <Stack direction="row" h="100%" w="100%" justify="flex-end" align="center" gap={4}>
                            <ShuffleButton />
                            <QueueDisplayIndicator />
                        </Stack>
                    </GridItem>
                </Grid>
                <audio
                    hidden
                    ref={audioRef}
                    src={src}
                    controls
                    onLoadedMetadata={onLoadedMetadata}
                    onTimeUpdate={onTimeUpdate}
                    onProgress={onProgress}
                />
            </Box>
        </Presence>
    )
}

export default AudioPlayer;
