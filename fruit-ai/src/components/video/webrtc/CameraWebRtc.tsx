/* eslint-disable @typescript-eslint/no-explicit-any */

import { fetchErrorCode } from "../../../redux/controller/camera.slice";
import { useDispatchRoot } from "../../../redux/store";
import StreamingResponse from "../../../utils/streamingResponse";
import React, {
    useRef,
    useEffect,
    useCallback,
    useState,
    CSSProperties,
} from "react";
import CameraStream from "./CameraStream";

const pc_config = {
    sdpSemantics: "unified-plan",
    iceServers: [
        // {
        // 	urls: 'stun:numb.viagenie.ca:3478',
        // 	credentials: 'qwerty!123',
        // 	username: 'thanhcong7893@gmail.com',
        // },
        {
            // urls: "stun:stun2.l.google.com:19302",
            urls: "stun:14.224.131.219:3478",
        },
        {
            urls: 'turn:14.224.131.219:3478',
            credential: 'turnserver',
            username: 'turnserver'
        }
    ],
};

export const StateConnectionConstant = {
    success: "success",
    failed: "failed",
};
interface Properties extends Props {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any;
    style?: CSSProperties;
    host?: string;

    mediaStream?: MediaStream;
    getOfferOnRemote?: (
        offer: RTCSessionDescription | null
    ) => Promise<Response>;
    onFinishLoad?: (status: string, media?: MediaStream) => void;
    url?: string;
    userId: string;
    cameraId: string | undefined;
    token: string;
}

const CameraWebRtcComponent = ({
    data = {},
    host = "http://178.128.19.31:4600/rtc",
    getOfferOnRemote = undefined,
    onFinishLoad = undefined,
    mediaStream = undefined,
    ...props
}: Properties): JSX.Element => {
    const pcsRef = useRef<RTCPeerConnection>();
    const [stream, setStream] = useState<MediaStream>();
    const dispatch = useDispatchRoot();
    const createPeerConnection = useCallback(() => {
        try {
            const pc = new RTCPeerConnection(pc_config);

            pc.onicecandidate = (e) => {
                if (
                    (e.currentTarget as RTCPeerConnection).connectionState ===
                    StateConnectionConstant.failed
                ) {
                    onFinishLoad &&
                        onFinishLoad(StateConnectionConstant.failed);
                }
            };

            // pc.onconnectionstatechange = (e) => {
            //     console.log("onconnectionstatechange");
            //     console.log(e);
            //     if (
            //         (e.currentTarget as RTCPeerConnection).connectionState ===
            //         StateConnectionConstant.failed
            //     ) {
            //         onFinishLoad &&
            //             onFinishLoad(StateConnectionConstant.failed);
            //     }
            // };

            pc.ontrack = (e) => {
                console.log("ontrack success");
                const data = e.streams[0];
                setStream(data);
                onFinishLoad &&
                    onFinishLoad(StateConnectionConstant.success, data);
            };

            return pc;
        } catch (e) {
            console.error(e);
            onFinishLoad && onFinishLoad(StateConnectionConstant.failed);
            return undefined;
        }
    }, [onFinishLoad]);

    useEffect(() => {
        // if (mediaStream && mediaStream !== undefined && mediaStream.active) {
        //     setStream(mediaStream);
        //     return;
        // }
        const pc = createPeerConnection();
        if (pc !== undefined) {
            pcsRef.current = pc;

            pc.createOffer({
                // offerToReceiveAudio: true,
                offerToReceiveVideo: true,
            })
                .then((offer) => pc.setLocalDescription(offer))
                .then(
                    () => {
                        // wait for ICE gathering to complete
                        console.log(new Date());
                        return new Promise<RTCSessionDescriptionInit | void>(
                            (resolve) => {
                                console.log('1. ---------', new Date());
                                console.log(pc.iceGatheringState);
                                if (pc.iceGatheringState === "complete") {
                                    console.log('2. ---------', new Date());
                                    console.log(resolve);
                                    resolve();
                                } else {
                                    const checkState = () => {
                                        console.log('Change ice state', pc.iceGatheringState);
                                        if (
                                            pc.iceGatheringState === "complete"
                                        ) {
                                            pc.removeEventListener(
                                                "icegatheringstatechange",
                                                checkState
                                            );
                                            resolve();
                                            console.log(resolve);
                                        }
                                    };

                                    pc.addEventListener(
                                        "icegatheringstatechange",
                                        checkState
                                    );
                                }
                            }
                        )
                    }
                )
                .then(() => {
                    console.log('3. ---------', new Date());
                    const offer = pc.localDescription;
                    if (getOfferOnRemote !== undefined) {
                        return getOfferOnRemote(offer);
                    }
                    console.log(
                        "----------------------Im checking right here------------------------"
                        ,{
                            // ...data,
                            cameraId: props.cameraId,
                            userId: props.userId,
                            token: props.token,
                            sdp: offer?.sdp,
                            type: offer?.type,
                            url: props.url
                        }
                    )
                    return fetch(host, {
                        body: JSON.stringify({
                            // ...data,
                            cameraId: props.cameraId,
                            userId: props.userId,
                            token: props.token,
                            sdp: offer?.sdp,
                            type: offer?.type,
                            url: props.url
                        }),
                        headers: {
                            "Content-Type": "application/json",
                        },
                        method: "POST",
                    });
                })
                .then((response) => {
                    console.log('4. ---------', new Date());
                    return response.json()
                })
                .then((answer: RTCSessionDescriptionInit | any) => {
                    console.log('5. ---------', new Date());
                    console.log(answer)
                    dispatch(fetchErrorCode(answer.message));
                    if (answer && answer?.statusCode === StreamingResponse.BadRequest.statusCodeMessage || answer?.statusCode === StreamingResponse.ErrorStreamingWEBRTC.statusCodeMessage) {
                        throw answer?.statusCode;
                    }
                    pc?.setRemoteDescription(answer);
                })
                .catch((e) => {
                    console.error(e);
                    onFinishLoad &&
                        onFinishLoad(StateConnectionConstant.failed);
                });
        }
        // // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, getOfferOnRemote, host]);

    return (
        <div {...props}>
            <CameraStream stream={stream} muted />
        </div>
    );
};

export const CameraWebRtc = React.memo(CameraWebRtcComponent);
