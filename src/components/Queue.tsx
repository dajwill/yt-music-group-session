import useQueue from '@/hooks/useQueue';
import { Button } from './ui/button';
import { Image, Box, Container, HStack, Icon, IconButton, List, Stack, Text } from '@chakra-ui/react';
import { CiSquareRemove, CiTrash } from 'react-icons/ci';
import { MdExplicit, MdPlayArrow } from 'react-icons/md';

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
} 

const Queue = () => {
    const { songs, currentUser } = initialState;
    const removeSong = (videoId: string) => {
        console.log(videoId)
    }
    return (
        <Container pb="120px">
            <List.Root gap="2" variant="plain" align="center" divideY="1px" gapY={0} cursor="pointer">
                {songs?.map(song => (
                    <HStack as={List.Item} p={2} className="group">
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
                            <Icon as={CiTrash} onClick={() => removeSong(song.videoId)} visibility="hidden" _groupHover={{ visibility: 'initial' }} />
                        )}
                    </HStack>
                ))}
            </List.Root>
        </Container>
    )
}

export default Queue