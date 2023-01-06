/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { FC, useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { v4 as uuidv4 } from 'uuid';
import PageHeader from '../common/page-header/page-header';
// import farmService from '@services/farm';
// import { apiPen } from '@api/pen';
// import { IPenData } from '@type/pen';
import CImageLoading from './CImageLoading';
import StreamAPI from '../../api/camera/streaming.api';
import { Modal } from '@material-ui/core';
import ModalHeader from '../common/modal/modal-header';
import Button from '@material-ui/core/Button';
import CameraAPI from '../../api/camera/camera.api';
import { Camera } from '../../common/models/camera-model';
import { dispatch } from 'rxjs/internal/observable/pairs';
import { useDispatchRoot, useSelectorRoot } from '../../redux/store';
import { fetchListCameraRequest } from '../../redux/controller/camera.slice';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
import Meta from 'antd/es/card/Meta';
// import PenEmptyCreat from '../farm/pen-empty/pen-empty-create';
// import { apiStreamingVideo } from '@api/streaming-video'
// import CamDetail from '../farm/pen/cam-detail'; // xem Detail cam

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '80%'
        },
        videoList: {
            display: 'flex',
            flexDirection: 'row',
            marginBottom: '10px',
            justifyContent: 'start',
            flexWrap: 'wrap'
        },
        videoItem: {
            marginLeft: '10px',
            marginRight: '10px',
            width: '420px'
        },
        videoItemFullScreen: {
            marginLeft: '10px',
            marginRight: '10px'
        },
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        modalContentCreate: {
            backgroundColor: 'white',
            width: '72%',
        },
        modalContentAlert: {
            width: '30%',
        },
        btnSave: {
            backgroundColor: '#FF5A80',
            color: '#FFFFFF',
            fontSize: '15px',
            textTransform: 'none',
            
            paddingLeft: '31px',
            paddingRight: '31px',
            marginLeft: '70%',
            marginTop: '1%',
            '&:hover': {
                backgroundColor: "#FF5A80",
                color: '#FFFFFF',
             },
        },
        btnDisconnected: {
            backgroundColor: 'gray',
            color: '#FFFFFF',
            fontSize: '15px',
            textTransform: 'none',
            paddingLeft: '31px',
            paddingRight: '31px',
            marginLeft: '70%',
            marginTop: '1%',
        },
        NoCam: {
            backgroundColor: '#6B7280',
            display: 'flex',
            height: '232.88px',
            padding: '3px',
            marginTop: '3px',
            justifyContent: 'center',
            alignItems: 'center',
        },
        ContentNoCam: {
            color: '#FFFFFF',
            fontSize: '16px',
            fontFamily: 'Inter', 
            fontStyle: 'normal'
        }
    }),
);

enum TabPaneKey {
    PenCreate = 'penCreate',
    CamSettings = 'camSettings',
    AddPig = 'addPig'
}

const Video: FC = () => {
    const classes = useStyles();
    const [pens, setPens] = useState<Array<Camera[] | any>>([]);
    const [penEmpty, setPenEmpty] = useState<Array< any>>([]); // Luu danh sach cac chuong trong

    // const currentFarm = farmService.getCurrentFarm();
    const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
    const [isFullScreenEmpty, setIsFullScreenEmpty] = useState<boolean>(false);

    const [openCU, setOpenCU] = useState(false);

    const [selectedPen, updateSelectedPen] = useState< any>(); //Luu chuong duoc chon

    const [lstStreamingRtcCamera, setLstStreamingRtcCamera] = useState<any>();

    const [lstPenEmptyCamera, setLstPenEmptyCamera] = useState<any>();

    const [isConnected, setIsConnected] = useState<boolean>(false);

    const [isAddPig, setIsAddPig] = useState<boolean>(false);

    const dispatch = useDispatchRoot();

    const { listCamera, errorCode } = useSelectorRoot((state) => state.camera);

    useEffect(()=>{
        const warehouseId = "63b542fe87dd5b2cfc063f5b" // tam thoi fix cung
        dispatch(fetchListCameraRequest(warehouseId));
    },[])

    useEffect( () => {
         // Lay danh sach camera theo id nha kho

        initRtcCamera() // Do cau truc cua lon la 1 trai co nhieu chuong, 1 chuong nhieu camera. con fruit la 1 trai nhieu cam, 1 cam 1 dong 
        getAllPenEmptys()
    }, [listCamera])

    const initRtcCamera = () => { // Khoi tao camera sau khi call API tat ca cac chuong 
        // const warehouseId = "63b542fe87dd5b2cfc063f5b"

        console.log(listCamera)
        setLstStreamingRtcCamera(
            <div className={classes.videoList}>
                {
                    listCamera && 
                    
                    listCamera.map((camera: any, index: any) => {
                        return (
                            <>
                                <Link to={{
                                    pathname: `/camera_detail/${camera.id}`
                                }}>
                                    {/*video*/}
                                    <Card
                                        className="camera-manager-card"
                                        style={{ width: 300 }}
                                        hoverable
                                        cover={
                                            <CImageLoading
                                                src={StreamAPI.getStream(camera.id)}
                                                className="h-56"
                                                uuid={uuidv4()}
                                                isFullScreen={isFullScreen}
                                                setIsFullScreen={setIsFullScreen}
                                                // pen={pen}
                                                // updateSelectedPen={updateSelectedPen}
                                                // onClick={() =>
                                                //     handleShowExpandMenu(true, item)
                                                // }
                                                // isHiddenCamera={pen?.cameras[0]?.isHiddenCamera ? true : false}
                                                idCamera={camera.id} // Hien ra danh sach cac chuong, va chi hien thi 1 camera cua 1 chuong
                                                
                                            />
                                        }
                                    >
                                        <Meta title={camera.name} description={camera.note} />
                                    </Card>

                                    {/* <div className={`cursor-pointer ${classes.videoItem}`}>
                                        <p>{camera?.name} </p>

                                        <CImageLoading
                                            src={StreamAPI.getStream(camera.id)}
                                            className="h-56"
                                            uuid={uuidv4()}
                                            isFullScreen={isFullScreen}
                                            setIsFullScreen={setIsFullScreen}
                                            // pen={pen}
                                            // updateSelectedPen={updateSelectedPen}
                                            // onClick={() =>
                                            //     handleShowExpandMenu(true, item)
                                            // }
                                            // isHiddenCamera={pen?.cameras[0]?.isHiddenCamera ? true : false}
                                            idCamera={camera.id} // Hien ra danh sach cac chuong, va chi hien thi 1 camera cua 1 chuong
                                            
                                        />
                                    </div> */}
                                    {/*end*/}

                                </Link>

                            </>
                        )
                    })
                }
            </div>
        )
    }

    // const initRtcCameraEmpty = (pensItem: IPenData[] | any) => { // Khoi tao camera cho chuong trong sau khi call API
    //     setLstPenEmptyCamera(
    //         <div className={classes.videoList}>
    //             {
    //                 pensItem && pensItem.map((pen: IPenData | any, index: any) => {
    //                     return (
    //                         <>
    //                             {/*video*/}
                                 
    //                             { (pen?.cameras.length > 0 ) ?
    //                             <div className={`cursor-pointer ${classes.videoItem}`}>
    //                                 <p>{pen?.name} - {pen?.cameras[0].camName}</p>
    //                                 <CImageLoading
    //                                     src={StreamAPI.getStream(pen.id)}
    //                                     className="h-56"
    //                                     uuid={uuidv4()}
    //                                     isEmptyPen = {true}
    //                                     isFullScreen={isFullScreen}
    //                                     setIsFullScreen={setIsFullScreenEmpty}
    //                                     pen={pen}
    //                                     updateSelectedPen={updateSelectedPen}
    //                                     // onClick={() =>
    //                                     //     handleShowExpandMenu(true, item)
    //                                     // }
    //                                     isHiddenCamera={pen?.cameras[0]?.isHiddenCamera ? true : false}
    //                                     idCamera={pen.cameras[0]?.id}
    //                                 />
    //                                 <Button
    //                                     onClick={() => handleOpenCU(true, pen)}
    //                                     variant="contained"
    //                                     className={classes.btnSave}
    //                                     // disabled={ isConnected ? false : true}
    //                                     >
    //                                     Đánh số
    //                                 </Button>
    //                             </div>
    //                             : <div className={`cursor-pointer ${classes.videoItem}`}>
    //                                 <p>{pen?.name}</p>
    //                                 <div className={classes.NoCam}>
    //                                     <div className={classes.ContentNoCam}>
    //                                         CHUỒNG CHƯA CÓ CAMERA
    //                                     </div>
    //                                 </div>
                                    
    //                             </div>
    //                             }
    //                             {/*end*/}
    //                         </>
    //                     )
    //                 })
    //             }
    //         </div>
    //     )
    // }

    useEffect(() => {
        const userId = "63b5390087dd5b2cfc063f44"
        // initRtcCamera();
    }, []);


    useEffect(() => {
        getAllPenEmptys();
    }, []);

    // useEffect(() => {
    //     // setLstStreamingRtcCamera(null)
    //     // setLstPenEmptyCamera(null)
    //     getAllPenEmptys();
    //     getAllPens();
    // }, [currentFarm])

    const [uuId, updateUuid] = useState<string>(uuidv4())

    // const terminateStreaming = () => {
    //     const payload = [uuId]
    //     pens.map( item => {
    //         apiStreamingVideo.terminateRTCStreaming(item.id, payload)
    //             .then((res) => {
    //                 console.log(res);
    //             })
    //             .catch((err) => {
    //                 console.log(err);
    //             });
    //     })
    //     penEmpty.map( item => {
    //         apiStreamingVideo.terminateRTCStreaming(item.id, payload)
    //             .then((res) => {
    //                 console.log(res);
    //             })
    //             .catch((err) => {
    //                 console.log(err);
    //             });
    //     })
    // }

    // const handleOpenCU = (penSelected?: IPenData) => {
    //     setOpenCU(true);
    // };

    const handleCloseCU = () => {
        setIsFullScreen(false);
    };

    const handleCloseCUEmpty = () => {
        setIsFullScreenEmpty(false);
    };

    // const getAllPens = () => {
    //     const warehouseId = "63b542fe87dd5b2cfc063f5b"

    //     dispatch(fetchListCameraRequest(warehouseId));

    //     initRtcCamera(res.data);
    //     // CameraAPI.getListCameraByIdWarehouse(params) //Doi sang call api Camera
    //     //     .then((res: any) => {
    //     //         setPens(res.data);
    //     //         initRtcCamera(res.data);
    //     //     })
    //     //     .catch((err: any) => {
    //     //         console.log(err);
    //     //     })
    // };

    const getAllPenEmptys = () => {
        const params = {
            offset: 0,
            size: 1000,
            // farmId: currentFarm.id,
            name: "",
            area: 0,
            weightTypeId: ""
        }

        // apiPen.getAllPenEmpty(params) // Call api lay danh sach cac chuong trong
        //     .then((res: any) => {
        //         setPenEmpty(res.items);
        //         initRtcCameraEmpty(res.items);
        //     })
        //     .catch((err: any) => {
        //         console.log(err);
        //     })
    };

    // const [penSelected, setPenSelected] = useState<IPenData | any>(); //Luu chuong da duoc chon 
    const [isUpdate, setIsUpdate] = useState(false);

    const handleCloseCUWithoutCancelStream = () => {
        setOpenCU(false);
    }

    // const handleOpenCU = (isUpdate: boolean, penSelected?: IPenData) => {  // Danh so trong modal khoi tao camera cho chuong trong
    //     setOpenCU(true);
    //     setPenSelected(penSelected);
    //     setIsUpdate(isUpdate);
    // };

    const handleCloseCUAddPig = () => {
        setOpenCU(false);
        getAllPenEmptys()
    };

    return (
        <div className={`${classes.root} main-content`}>
            {/* <PageHeader
                pageTile={`${pens.length} Chuồng nuôi`}
                isButton={false}
            /> */}
            {/* <div className={classes.videoList}>
                {
                    pens.map((pen, index) => {
                        return (
                            <>
                                <div className={classes.videoItem}>
                                    <VideoItem uuId={uuidv4()} camId={pen.cameras[0]?.id} width='300' height='300' />
                                </div>
                            </>
                        )
                    })
                }
            </div> */}

            {/* Danh sach camera */}
            {lstStreamingRtcCamera} 

            {/* <PageHeader
                pageTile={`${penEmpty.length} Chuồng trống`}
                isButton={false}
            /> */}
            {lstPenEmptyCamera}
            <Modal
                open={isFullScreen}
                // onClose={handleCloseCU}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                className={classes.modal}>
                <div className={classes.modalContentCreate}>
                    {/* Modal xem chi tiet camera */}
                    <ModalHeader title={`${selectedPen?.name}`} closeButton={handleCloseCU} /> 
                    <div className={`cursor-pointer ${classes.videoItemFullScreen}`}>
                        {/* <CamDetail camSelectedData={selectedPen?.cameras[0]} isBackOnClick={false} isEmptyPen={false} /> */}
                        {/* <CImageLoading
                            src={StreamAPI.getStream(selectedPen?.id)}
                            className="h-60"
                            uuid={uuidv4()}
                            // onClick={() =>
                            //     handleShowExpandMenu(true, item)
                            // }
                            isHiddenCamera={selectedPen?.cameras[0]?.isHiddenCamera ? true : false}
                            idCamera={selectedPen?.cameras[0]?.id}
                        /> */}
                    </div>
                </div>
            </Modal>
            <Modal
                open={isFullScreenEmpty}
                // onClose={handleCloseCU}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                className={classes.modal}>
                <div className={classes.modalContentCreate}>
                    <ModalHeader title={`${selectedPen?.name}`} closeButton={handleCloseCUEmpty} />
                    <div className={`cursor-pointer ${classes.videoItemFullScreen}`}>
                        <CImageLoading
                            src={StreamAPI.getStream(selectedPen?.id)}
                            className="h-60"
                            isEmptyPen={true}
                            uuid={uuidv4()}
                            // onClick={() =>
                            //     handleShowExpandMenu(true, item)
                            // }
                            isHiddenCamera={selectedPen?.cameras[0]?.isHiddenCamera ? true : false}
                            idCamera={selectedPen?.cameras[0]?.id}
                        />
                    </div>
                </div>
            </Modal>


            {/* Cap nhat chuong */}
            {/* <Modal
                    open={openCU} 
                    onClose={handleCloseCUAddPig}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    className={classes.modal}>
                    <div className={classes.modalContentCreate}>
                        <ModalHeader title='Cập nhật chuồng' closeButton={handleCloseCUAddPig} />
                        <div style={{ zIndex: 2000 }}>
                            <PenEmptyCreat
                                onClose={handleCloseCU}
                                onRefresh={getAllPenEmptys}
                                penData={penSelected}
                                isUpdate={isUpdate}
                                keyProp = {TabPaneKey.AddPig}
                                onCloseWithoutCancelStream={handleCloseCUWithoutCancelStream}
                                setIsAddPigPar={setIsAddPig}
                            />
                        </div>
                    </div>
            </Modal> */}
        </div>
    );
}

export default Video;
