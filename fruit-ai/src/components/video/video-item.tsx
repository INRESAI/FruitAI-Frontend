import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { FC, useEffect, useState } from 'react';
import ScaleLoader from "react-spinners/ScaleLoader";

import { apiStreamingVideo } from '../../api/streaming-video';
import { IPenData } from '../../types/pen';

type VideoItemProps = {
    uuId: string;
    pen: IPenData;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            border: '2px solid black'
        },
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

const VideoItem: FC<VideoItemProps> = ({ uuId, pen } : VideoItemProps) => {
    const classes = useStyles();
    const [streamingVideoURL, setStreamingVideoURL] = useState<string>("");
    const [loadingVideo, setLoadingVideo] = useState(true);

    useEffect(() => {
        //componentDidMount
        getURLStreaming();
        //componentWillUnmount
        //return () => {
        //};
    }, []);

    const getURLStreaming = () => {
        if (pen.name == "C100.1") {
            setStreamingVideoURL(apiStreamingVideo.getStreamingVideoURL("3", uuId));
        } else if (pen.name == "C100.2") {
            setStreamingVideoURL(apiStreamingVideo.getStreamingVideoURL("1", uuId));
        } else if (pen.name == "C100.3") {
            setStreamingVideoURL(apiStreamingVideo.getStreamingVideoURL("2", uuId));
        } else {
            setStreamingVideoURL(apiStreamingVideo.getStreamingVideoURL("3", uuId));
        }
    };

    const videoStreamingLoaded = () => {
        setLoadingVideo(false);
    }

    return (
        <div className={`${classes.root}`}>
            {
                loadingVideo && (
                    <div className={classes.spinnerLoadingVideo}>
                        <ScaleLoader color={"#FF5A80"} loading={loadingVideo} />
                    </div>
                )
            }
            {
                streamingVideoURL.length > 0 && (
                    <img src={streamingVideoURL} className={classes.video} onLoad={videoStreamingLoaded}/>
                )
            }
        </div>
    );
}

export default VideoItem;
