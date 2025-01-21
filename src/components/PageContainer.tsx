import useQueue from "@/hooks/useQueue"
import { Container } from "@chakra-ui/react"
import { PropsWithChildren } from "react";

const PageContainer = ({ children }: PropsWithChildren) => {
    const { state } = useQueue();

    return (
        <Container paddingTop={4} pb={!!state.songs.length ? '120px' : '20px'}>
            {children}
        </Container>
    )
};

export default PageContainer;