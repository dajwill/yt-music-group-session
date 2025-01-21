import { Text, Image, List, HStack, Stack, Icon, Box, Heading } from "@chakra-ui/react"
import { MdExplicit, MdPlayArrow } from "react-icons/md"
import { FaEllipsisVertical } from "react-icons/fa6";
import { useSearch } from '@/queries';
import useSearchValue from "@/hooks/useSearchValue";
import {
    MenuContent,
    MenuItem,
    MenuRoot,
    MenuTrigger,
  } from "@/components/ui/menu"
import useQueue from "@/hooks/useQueue";
import { Song } from "@/types";
import { QueueAction } from "@/state/queueStore";
import PageContainer from "@/components/PageContainer";
import { useCallback } from "react";

const ListItemMenu = (song: Song) => {
    const { dispatch } = useQueue();
    const onClick = () => {
        dispatch({
            type: QueueAction.addToQueue,
            payload: song
        })
    }
    return (
        <span onClick={e => e.stopPropagation()}>
            <MenuRoot positioning={{ placement: "bottom-start" }}>
                <MenuTrigger asChild>
                    <Icon visibility="hidden" _groupHover={{ visibility: 'initial' }}>
                        <FaEllipsisVertical />
                    </Icon>
                </MenuTrigger>
                <MenuContent>
                    <MenuItem value="new-txt-a" onClick={onClick}>
                        Add to Queue
                    </MenuItem>
                </MenuContent>
            </MenuRoot>
        </span>
    )
}


const Search = () => {
    const q = useSearchValue();
    const { data } = useSearch({ q, filter: 'songs' })
    const { dispatch } = useQueue();

    const playSong = useCallback((song: Song) => {
        dispatch({
            type: QueueAction.playSong,
            payload: song
        })
    }, [dispatch])

    return (
        <PageContainer>
            <Heading>Results</Heading>
            <List.Root gap="2" variant="plain" align="center" divideY="1px" gapY={0} cursor="pointer">
                {data?.map(song => (
                    <HStack as={List.Item} p={2} className="group" key={`search-result-${song.videoId}`} onClick={() => playSong(song)}>
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
                                    <Icon>
                                        <MdExplicit />
                                    </Icon>
                                )}
                                <Text>{song.artists?.[0].name}</Text>
                                <span>&middot;</span>
                                <Text>{song.duration}</Text>
                            </HStack>
                        </Stack>
                        <ListItemMenu {...song} />
                    </HStack>
                ))}
            </List.Root>
        </PageContainer>
    )
}

export default Search;