import PageContainer from '@/components/PageContainer';
import useQueue from '@/hooks/useQueue';
import { QueueAction } from '@/state/queueStore';
import { Image, Box, HStack, Icon, List, Stack, Text, Heading } from '@chakra-ui/react';
import { useCallback } from 'react';
import {  CiTrash } from 'react-icons/ci';
import { MdExplicit, MdPlayArrow } from 'react-icons/md';

const Queue = () => {
    const {state, dispatch} = useQueue();
    const { songs, currentUser } = state;
    const skipTo = useCallback((position: number) => {
        dispatch({
            type: QueueAction.skipTo,
            payload: position
        })
    }, [dispatch])
    const removeSong = (position: number) => {
        dispatch({
            type: QueueAction.removeSong,
            payload: position
        })
    }
    return (
        <PageContainer>
            <Heading>Queue</Heading>
            <List.Root gap="2" variant="plain" align="center" divideY="1px" gapY={0} cursor="pointer">
                {songs?.map((song, index) => (
                    <HStack as={List.Item} p={2} className="group" key={`queue-song-${song.videoId}`} onClick={() => skipTo(index)}>
                        <Stack position="relative">
                            <Image
                                height="60px"
                                src={song?.thumbnails?.[1]?.url}   
                            />
                            <Stack
                                position="absolute"
                                w="100%"
                                h="100%"
                                align="center"
                                justify="center"
                                visibility="hidden"
                                _groupHover={{ visibility: 'initial' }}
                            >
                                <Box position="absolute" w="100%" h="100%" bgColor="blackAlpha.700" zIndex={1} />
                                <Icon color="white" size="2xl" as={MdPlayArrow} zIndex={2} />
                            </Stack>
                        </Stack>
                        <Stack alignItems="flex-start" flexGrow={1} gap={0}>
                            <Text fontWeight="semibold">{song.title}</Text>
                            <HStack gapX={1}>
                                {song.isExplicit && (
                                    <Icon as={MdExplicit} />
                                )}
                                <Text>{song.artists?.[0].name}</Text>
                                <span>&middot;</span>
                                <Text>{song.duration}</Text>
                            </HStack>
                        </Stack>
                        {song.owner === currentUser && (
                            <Icon as={CiTrash} onClick={() => removeSong(index)} visibility="hidden" _groupHover={{ visibility: 'initial' }} />
                        )}
                    </HStack>
                ))}
            </List.Root>
        </PageContainer>
    )
}

export default Queue