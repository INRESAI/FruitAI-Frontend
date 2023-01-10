/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Camera, IGetCameraManage } from "../../common/models/camera-model";
import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
// import { BsEyeSlash } from "react-icons/bs";
import { useDispatch } from "react-redux";
import ScaleLoader from "react-spinners/ScaleLoader";
// import { palette } from "theme/theme-define";
import StreamAPI from "../../api/camera/streaming.api";
import { addMedia } from "../../redux/controller/camera.slice";
import { useSelectorRoot } from "../../redux/store";
import { CameraWebRtc, StateConnectionConstant } from "./webrtc/CameraWebRtc";
// import fullScreen from '@assets/fullscreenwhite.png'
import { IPenData } from "../../types/pen";
import { apiStreamingVideo } from "../../api/streaming-video";

interface PropsCImageLoading extends Props {
    src: string;
    idCamera?: string;
    enableRTC?: boolean;
    uuid?: string;
    onFinishLoading?: (status: string, media?: MediaStream) => void;
    isFullScreen?: boolean;
    setIsFullScreen?: any;
    pen?: IPenData | any;
    // updateSelectedPen?: any
    isEmptyPen?: boolean
}
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        content: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            width: '100%',
            overflowY: 'scroll',
            maxHeight: '500px'
        },
        penVideo: {
            width: '100%'
        },
        spinnerLoadingVideo: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            marginTop: '23%',
            marginBottom: '23%',
            minWidth: "200px",
            position: 'absolute',
        },
        spinnerLoadingAPI: {
            position: 'absolute',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            // width: '100%',
            height: '100%'
        },
        img: {
            width: '100%'
        },
        back: {
            display: 'block',
            position: 'absolute',
            left: 10,
            top: 10,
            backgroundColor: '#00B2FF',
            color: 'white',
            fontSize: '12px',
            paddingLeft: '5px',
            paddingRight: '5px'
        },
        videoHelpText: {
            display: 'block',
            position: 'absolute',
            left: 10,
            top: 30,
            backgroundColor: '#FF5A80',
            color: 'white',
            fontSize: '12px',
            paddingLeft: '5px',
            paddingRight: '5px'
        },
        pointClicked: {
            display: 'block',
            position: 'absolute',
            backgroundColor: '#FF5A80',
            width: '20px',
            height: '20px',
            borderRadius: '100%'
        },
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        modalContentCreate: {
            backgroundColor: 'white',
            width: '60%',
            overflow: 'scroll',
            maxHeight: '600px'
        },
        fullScreen: {
            position: "absolute",
            zIndex: 5,
            bottom: 0,
            right: 0,
            cursor: "pointer",
            width: '32px'
        },
        bounderStreaming: {
            position: 'relative',
            padding: '3px',
            minWidth: '300px'
        }
    }),
);
function CImageLoading({
    src,
    className,
    style,
    onClick,
    idCamera,
    enableRTC = true,
    uuid = "NoneAI",
    onFinishLoading = undefined,
    isFullScreen = undefined,
    setIsFullScreen = undefined,
    pen = undefined,
    updateSelectedPen = undefined,
    isEmptyPen = false,
}: PropsCImageLoading) {
    // StreamAPI
    const classes = useStyles();
    const { listCamera, errorCode } = useSelectorRoot((state: any) => state.camera);
    let camera: Camera | undefined;
    if (listCamera?.length > 0)
        camera = listCamera?.find((x: any) => x?.id === idCamera);
    // State for showing image
    const [isSmallImageLoaded, loadSmallImage] = useState<boolean>(true);
    const [isShowNotContent, setShowNotContent] = useState<boolean>(false);
    const [isReloadImage, setIsReloadImage] = useState<boolean>(false);
    const [intervalId, setIntervalId] = useState<any>();
    const [data, setData] = useState({ cameraId: idCamera });
    const [currentUserId,setCurrentUserId] = useState<any>(); // Lấy userId hiện tại để call API streaming
    const [currentToken,setCurrentToken] = useState<any>()
    const ref = useRef<HTMLImageElement>(null);
    const dispatch = useDispatch();

    

    useEffect(() => {
        //componentWillUnmount
        // return () => {
        //     terminateStreamingVideoByUuId();
        // };
        let userId = localStorage.getItem('userId')
        let token = localStorage.getItem('token')
        if(userId){
            userId = userId.slice(1);
            userId = userId.slice(0, userId.length - 1);
        }
        setCurrentUserId(userId);
        setCurrentToken(token);

    }, []);

    // const terminateStreamingVideoByUuId = () => {
    //     const payload = [uuid]
    //     idCamera && apiStreamingVideo.terminateRTCStreaming(idCamera, payload)
    //         .then((res) => {
    //             console.log(res);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // };
    // Define handle
    const handleSmallImageLoad = () => {
        loadSmallImage(false);
        setShowNotContent(false);
        if (!intervalId) {
            const refreshImage = setInterval(() => {
                if (ref && ref.current) {
                    ref.current.setAttribute(
                        "src",
                        `${src}?random=${new Date().getTime()}`
                    );
                }
                //setUrlImage(`${newUrlImage[0]}?random=${new Date().getTime()}`)
            }, 8000);
            setIntervalId(refreshImage);
        }
    };
    const handleErrorLoadImage = () => {
        setTimeout(() => {
            loadSmallImage(false);
            setShowNotContent(true);
        }, 500);
    };
    // useEffect(() => {
    //     if (
    //         camera !== undefined &&
    //         (camera.isHiddenCamera || camera?.media?.active)
    //     ) {
    //         loadSmallImage(false);
    //     } else {
    //         loadSmallImage(true);
    //         setShowNotContent(false);
    //     }
    //     return () => {
    //         intervalId && clearInterval(intervalId);
    //     };
    // }, [intervalId, isReloadImage, camera]);
    useEffect(() => {
        if (data.cameraId !== idCamera) {
            setData({ cameraId: idCamera });
        }
    }, [data.cameraId, idCamera]);

    const handleRetryLoadImage = () => {
        setIsReloadImage(!isReloadImage);
    };

    const updateIsFullScreen = () => {
        setIsFullScreen && setIsFullScreen(isFullScreen ? false : true)
        // updateSelectedPen && updateSelectedPen(pen)
    }

    return (
        <>
            <div className={classes.bounderStreaming}>
                {/* {
                    isFullScreen == false && (<img className={classes.fullScreen} onClick={updateIsFullScreen} id="full-screen-img" 
                    // src={fullScreen} 
                    alt='fullScreen' />)
                } */}
                {/* <CLoading
                    visible={false}
                    className={`${clsx(
                        isSmallImageLoaded && "border-2"
                    )} w-full flex justify-center`}> */}
                {
                    true 
                    ? (
                    <React.Fragment>
                        {isSmallImageLoaded && (
                            <div className={`${classes.spinnerLoadingVideo}`}>
                                <ScaleLoader color={"#1dce00"} loading={isSmallImageLoaded} />
                            </div>
                        )}

                        {(!isShowNotContent && currentUserId && currentToken) ? (
                            enableRTC ? (
                                <CameraWebRtc
                                    userId= {currentUserId}
                                    cameraId= {idCamera}
                                    token = {currentToken}
                                    url={camera?.link}
                                    onClick={onClick}
                                    data={data}
                                    host={ "http://178.128.19.31:4600/rtc"}
                                    style={{ height: "100%" }}
                                    // mediaStream={camera?.media}
                                    onFinishLoad={(status, media) => {
                                        if (media && camera) {
                                            dispatch(
                                                addMedia({ ...camera, media })
                                            );
                                        }
                                        if (
                                            status ===
                                            StateConnectionConstant.failed
                                        ) {
                                            handleErrorLoadImage();
                                            if (camera) {
                                                dispatch(
                                                    addMedia({
                                                        ...camera,
                                                        media: undefined,
                                                    })
                                                );
                                            }
                                        }
                                        loadSmallImage(false);
                                        onFinishLoading &&
                                            onFinishLoading(status, media);
                                    }}
                                />
                            ) : (
                                <img
                                    ref={ref}
                                    src={src}
                                    className={`${clsx(
                                        isSmallImageLoaded && "h-56"
                                    )} ${className} w-full`}
                                    style={style}
                                    onClick={onClick}
                                    alt="404"
                                    onLoad={handleSmallImageLoad}
                                    onError={handleErrorLoadImage}
                                />
                            )
                        ) : (
                            <div
                                className={`${className} w-full flex flex-col justify-center items-center bg-gray-500 p-2.5`}
                                style={style}>
                                <h2 className="text-base text-white">
                                    {errorCode ? errorCode.toUpperCase() : 'KHÔNG CÓ KẾT NỐI'}
                                </h2>
                                <button
                                    className="text-base text-white bg-gray-400 p-3 px-10 rounded-md mt-2.5"
                                    onClick={handleRetryLoadImage}>
                                    Thử lại
                                </button>
                            </div>
                        )}
                    </React.Fragment>
                ) : (
                    <div
                        className={`${className} w-full flex justify-center items-center bg-gray-100 `}
                        style={style}>
                        isHidd
                        {/* <BsEyeSlash
                        style={{ fontSize: "2rem", color: palette.gray }}
                    /> */}
                    </div>
                )}
                {/* </CLoading> */}
            </div>
        </>
    );
}

export default React.memo(CImageLoading);
