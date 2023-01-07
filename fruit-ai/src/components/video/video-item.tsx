import React, { FC, useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ScaleLoader from "react-spinners/ScaleLoader";

import { apiStreamingVideo } from '../../api/streaming-video'
// import { IPenData } from '@type/pen';

type VideoItemProps = {
    uuId: string;
    camId: string;
    width: string;
    height: string;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        video: {
            width: '100%'
        },
        spinnerLoadingVideo: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '300px',
            height: '200px'
        },
    }),
);

const VideoItem: FC<VideoItemProps> = ({ uuId, camId, width, height }: VideoItemProps) => {
    const classes = useStyles();
    const [streamingVideoURL, setStreamingVideoURL] = useState<string>("");
    const [loadingVideo, setLoadingVideo] = useState(true);

    useEffect(() => {
        //componentDidMount
        getURLStreaming();

        //componentWillUnmount
        return () => {
            terminateStreamingVideoByUuId();
        };
    }, []);

    const terminateStreamingVideoByUuId = () => {
        const payload = [uuId]

        // apiStreamingVideo.terminateByUuId(payload)
        //     .then((res) => {
        //         console.log(res);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
        apiStreamingVideo.terminateRTCStreaming(camId, payload)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getURLStreaming = () => {
        setStreamingVideoURL(apiStreamingVideo.getStreamingVideoURL(camId, uuId));
    };

    const videoStreamingLoaded = () => {
        setLoadingVideo(false);
    }

    return (
        <div>
            {
                loadingVideo && (
                    <div className={classes.spinnerLoadingVideo}>
                        <ScaleLoader color={"#FF5A80"} loading={loadingVideo} />
                    </div>
                )
            }
            {
                streamingVideoURL.length > 0 && (
                    <img src={streamingVideoURL} className={classes.video} onLoad={videoStreamingLoaded} width={width} height={loadingVideo ? "5" : height} />
                )
            }
        </div>
    );
}

export default VideoItem;
