import { Box, Grid, GridItem, Icon, Image, Presence, Stack, Text } from "@chakra-ui/react";
import { useRef, useState, ChangeEvent, useCallback } from "react"
import { Slider, SliderProps } from "@/components/ui/slider";
import { MdSkipPrevious, MdSkipNext, MdPlayArrow, MdPause, MdExplicit } from "react-icons/md";
import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";
import formatTime from "@/utils/formatTime";
import useQueue from "@/hooks/useQueue";
import { QueueAction } from "@/state/Queue";
import { useColorModeValue } from "./ui/color-mode";
import { useLocation, useSearch } from 'wouter';

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
    <Stack direction="row" align="center" justify="center" maxW="min-content">
        <Icon size="2xl" onClick={onPrevious}><MdSkipPrevious /></Icon>
        <Icon fontSize="3.5em" onClick={onTogglePlayState}>{isPlaying ? <MdPause /> : <MdPlayArrow />}</Icon>
        <Icon size="2xl" onClick={onNext}><MdSkipNext /></Icon>
    </Stack>
);

const QueueLink = () => {
    const [location, navigate] = useLocation();
    const searchParams = useSearch()
    const getPrevPath = useCallback(() => {
        return !!searchParams ? `${location}?${searchParams}` : location
    }, [location, searchParams])

    return (
        location === '/queue' ? (
            <Icon size="2xl" as={AiOutlineCaretDown} onClick={() => navigate(window.history.state?.prevPath ?? '/')} />
        ) : (
            <Icon size="2xl" as={AiOutlineCaretUp} onClick={() => navigate('/queue', { state: { prevPath: getPrevPath() }})} />
        )
    )
}

const AudioPlayer = ({ src, width }: IAudioPlayer) => {
    const { state, dispatch } = useQueue();
    const currentSong = state.songs?.[state.nowPlaying];
    const bg = useColorModeValue('whiteAlpha.950', 'blackAlpha.950');
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [mediaTime, setMediaTime] = useState(0);
    const [bufferedAmount, setBufferedAmount] = useState(0);

    const onPrevious = useCallback(() => {
        dispatch({ type: QueueAction.previous })
    }, [dispatch]);

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
            >
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
                <Grid templateColumns="repeat(4, 1fr)" gap="4" h="100%" bg={bg} px={8}>
                    <GridItem as={Stack} colSpan={1}>
                        <Stack direction="row" align="center" gapX={4} h="100%" w="100%">
                            <Controls isPlaying={isPlaying} onTogglePlayState={togglePlaying} onNext={(state.nowPlaying <= state.songs.length)  ? onNext : undefined} onPrevious={onPrevious} />
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
                                src={currentSong?.thumbnails[1].url}
                            />
                            <Stack alignItems="flex-start" minW="350px" gap={0}>
                                <Text fontWeight="semibold">{currentSong?.title}</Text>
                                <Stack direction="row" gapX={1}>
                                    {currentSong?.isExplicit && (
                                        <Icon as={MdExplicit} />
                                    )}
                                    <Text>{currentSong?.artists?.[0].name}</Text>
                                    <span>&middot;</span>
                                    <Text>{currentSong?.duration}</Text>
                                </Stack>
                            </Stack>
                        </Stack>
                    </GridItem>
                    <GridItem colSpan={1}>
                        <Stack h="100%" w="100%" align="flex-end" justify="center">
                            <QueueLink />
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
