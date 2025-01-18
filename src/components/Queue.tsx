import React from 'react';
import useQueue from '@/hooks/useQueue';
import { Button } from './ui/button';
import { Box, HStack, IconButton, Stack, Text } from '@chakra-ui/react';
import { CiSquareRemove } from 'react-icons/ci';

const Queue = () => {
    const [state, dispatch, patchState] = useQueue();
    console.log({
        state, dispatch, patchState
    })

    const onClick = () => {
        console.log('add song');
        dispatch({
            type: 'addToQueue',
            song: {
                "title": "Liverpool Street In The Rain",
                "artist": "Mall Grab",
                "duration": 333,
                "videoId": "IxQHHqqtd0M"
            }
        })
    }

    const remove = (index: number) => {
        console.log('remove song at pos:', index)
        dispatch({
            type:'removeSong',
            index
        })
    }

    return (
        <Stack width="100%">
            <Button onClick={onClick}>Add To Queue</Button>
            {
                state.queue.map((song, index) => (
                    <Box>
                        <HStack justify="space-between">
                            <Text>{song.title}</Text>
                            <IconButton onClick={() => remove(index)}>
                                <CiSquareRemove />
                            </IconButton>
                        </HStack>
                    </Box>
                ))
            }
        </Stack>
    )
}

export default Queue