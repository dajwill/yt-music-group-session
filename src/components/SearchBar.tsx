import { KeyboardEvent, useEffect, useRef } from 'react';
import { Icon, Input } from '@chakra-ui/react'
import { LuSearch } from 'react-icons/lu'
import { InputGroup, type InputGroupProps } from '@/components/ui/input-group'
import { Box, Container, HStack } from '@chakra-ui/react'
import { useLocation, useSearch } from 'wouter';

export const SearchBar = () => {
    return (
        <Box borderBottomWidth="1px" bg="bg.panel" position="sticky" top="0" zIndex="docked">
            <Container py={{ base: '3.5', md: '4' }}>
                <HStack justify="space-between">
                    <SearchField hideBelow="md" />
                </HStack>
            </Container>
        </Box>
    )
}

const useSearchValue = () => {
    const searchString = useSearch();
    const searchParams = new URLSearchParams(searchString);
    return searchParams.get('q') ?? undefined
}

export const SearchField = (props: Omit<InputGroupProps, 'children'>) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const defaultValue = useSearchValue();
    const [_, navigate] = useLocation();

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.value = defaultValue ?? ''
        }
    }, [defaultValue])

    const onSubmit = (e: KeyboardEvent<HTMLInputElement>) => {
        const q = e.currentTarget.value;
        if (!!q && e.key === 'Enter') {
            navigate('/search?' + new URLSearchParams({q}).toString())
        }
    }
    return (
        <InputGroup
            flex="1"
            maxW="md"
            startElement={
                <Icon size="sm">
                    <LuSearch />
                </Icon>
            }
            {...props}
        >
            <Input placeholder="Search" variant="subtle" onKeyDown={onSubmit} ref={inputRef} />
        </InputGroup>
    )
}

export default SearchBar;