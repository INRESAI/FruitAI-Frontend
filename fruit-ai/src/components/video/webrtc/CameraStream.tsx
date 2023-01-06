import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    height: 100%;
`;

const VideoContainer = styled.video`
    width: 100%;
    height: 100%;
`;

interface Prop {
    stream: MediaStream | undefined;
    muted?: boolean;
    autoPlay?: boolean;
}

const CameraStream = ({
    stream,
    muted,
    autoPlay = true,
}: Prop): JSX.Element => {
    const ref = useRef<HTMLVideoElement>(null);
    const [isMuted, setIsMuted] = useState<boolean>(false);

    useEffect(() => {
        if (ref.current && stream && stream.active)
            ref.current.srcObject = stream;
        if (muted) setIsMuted(muted);
    }, [stream, muted]);

    return (
        <Container>
            <VideoContainer ref={ref} muted={isMuted} autoPlay={autoPlay} />
        </Container>
    );
};

export default CameraStream;
