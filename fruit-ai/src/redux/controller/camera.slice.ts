/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddNewCameraRequest, Camera, IGetCameraManage } from "../../common/models/camera-model";
import Utils from "../../common/utils";
// import { rootEpic } from ;
import { catchError, filter, map, mergeMap, switchMap } from "rxjs/operators";
import CameraAPI from "../../api/camera/camera.api";
import StreamAPI from "../../api/camera/streaming.api";
// import { importPigFromAI } from "../../api/pig";
import { RootEpic } from "../../common/define-type";
import { notification } from "antd";
// import openNotification, { NotificationType } from "../../components/common/notification/Notification";
// import { IImportPig, IImportPigExpanded } from "../../types/pig";

interface CameraState {
    message: string
    isLoading: boolean,
    isShowExpandCamera: boolean,
    isShowLog: boolean,
    listCamera: IGetCameraManage[],
    currentCamera: IGetCameraManage| null,
    dataConnectionCamera: IGetCameraManage | null,
    errorCode: string,
    restartFlag: boolean,
    restartCameraStatus: any | null
}
const initialStateBootstrap: CameraState = {
    message: "",
    isLoading: false,
    isShowExpandCamera: false,
    listCamera: [
        // {
        //     account: "namdoel1412@gmail.com",
        //     camName: "HIK Cam",
        //     id: "62610e5a520f5f7fcf02b284",
        //     linkStreaming: "rtsp://test:adm252079@inres.ddns.net:554/cam/realmonitor?channel=2&subtype=0",
        //     manufacturer: "HIK",
        //     metaData: "0",
        //     passwordCam: "namdoel1412",
        //     penId: "62610e5a520f5f7fcf02b282",
        // }
    ],
    currentCamera: null,
    dataConnectionCamera: null,
    isShowLog: false,
    errorCode: "",
    restartFlag: false,
    restartCameraStatus: null
};

const cameraSlice = createSlice({
    name: 'camera',
    initialState: initialStateBootstrap,
    reducers: {
        setIsExpandLog: (state, action: PayloadAction<boolean>) => {
            state.isShowLog = action.payload;
        },
        setDefaultSate: (state, action: PayloadAction<string>) => {
            state.message = "";
            state.isLoading = false;
            state.isShowExpandCamera = false;
            state.dataConnectionCamera = null
        },
        messageError: (state, action: PayloadAction<string>) => {
            state.message = action.payload;
            state.isLoading = false;
        },
        setIsExpandCamera: (state, action: PayloadAction<boolean>) => {
            state.isShowExpandCamera = action.payload;
        },
        fetchListCameraRequest: (state, action: PayloadAction<any>) => {
            state.isLoading = true
        },
        fetchListCameraSuccess: (state, action: PayloadAction<Camera[]>) => {
            state.listCamera = action.payload;
            // state.listCamera.push({
            //     analysisStatus: 1,
            //     code: "0HMHKM026UFH9",
            //     connectionStatus: 0,
            //     description: "",
            //     fps: 0,
            //     hostString: "rtsp://test:adm252079@inres.ddns.net:554/cam/realmonitor?channel=2&subtype=0",
            //     id: "622773d5765de90618dda5ec",
            //     ip: "inres.ddns.net",
            //     name: "HKVISION",
            //     port: "8000",
            //     position: "",
            //     resolution: ""
            // })
            state.isLoading = false
        },



        addCameraRequest: (state,action: PayloadAction<AddNewCameraRequest>) => {
            state.isLoading = true;
        },
        addCameraSuccess: (state, action: PayloadAction<IGetCameraManage | null>) => {
            state.isLoading = false
            state.message = ""
            if (action.payload) {
                state.listCamera.push(action.payload)
            }
        },
        connectionCamera: (state, action: PayloadAction<IGetCameraManage | null>) => {
            state.dataConnectionCamera = action.payload;
        },
        setListCameraGrid: (state, action: PayloadAction<IGetCameraManage>) => {
            const { id } = action.payload;
            const index = state.listCamera.findIndex(x => x.id === id);
            if (index !== -1) state.listCamera[index] = action.payload;

        },


        //Delete cam request
        deleteCameraRequest: (state, action: PayloadAction<string>) => {
            state.isLoading = true
        },
        deleteCameraSuccess: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.listCamera.splice(state.listCamera.findIndex((arrow) => arrow.id === action.payload), 1);
            notification.open({
                message: 'Xoá camera thành công',
                type: "success",
                onClick: () => {
                    console.log('Notification Clicked!');
                },
            });
        },
        deleteCameraFail: (state) => {
            state.isLoading = false;
            notification.open({
                message: 'Xoá camera thất bại',
                type: 'error',
                onClick: () => {
                    console.log('Notification Clicked!');
                },
            });
        },

        //Get Camera
        getCameraByIdRequest: (state, action: any) => {
            state.isLoading = true
        },

        getCameraByIdSuccess: (state, action: PayloadAction<IGetCameraManage>) => {
            state.isLoading = false
            state.currentCamera = action.payload
            console.log(state.currentCamera)
        },

        getCameraByIdFail: (state, action: any) => {
            state.isLoading = false
        },



        addMedia: (state, action: PayloadAction<IGetCameraManage>) => {
            if (state.listCamera?.findIndex === undefined) state.listCamera = [];
            if (action.payload && action.payload.id) {
                state.listCamera = state.listCamera.filter(x => x != null);
                const item = state.listCamera.findIndex(x => x.id === action.payload.id);
                if (item === -1) {
                    state.listCamera[state.listCamera.length + 1] = action.payload;
                } else {
                    state.listCamera[item] = action.payload;
                }
            }
        },
        fetchErrorCode: (state, action: PayloadAction<string>) => {
            state.errorCode = action.payload;
        },

        restartAnalysisCameraReq: (state, action: PayloadAction<any>) => {
            state.isLoading = true
        },
        restartAnalysisCameraSuccess: (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.restartFlag = !state.restartFlag;
            console.log(action.payload);
            // openNotification(NotificationType.Info, 'topLeft', `PIGMAN`, `${action?.payload?.message}.\n`);
        },
        restartAnalysisCameraFailed: (state, action: PayloadAction<any>) => {
            console.log(action.payload);
            state.restartFlag = false;
            // openNotification(NotificationType.Error, 'topLeft', `PIGMAN`, `${action?.payload?.message}.\n`);
        },

        // importPigRequest: (state, action: PayloadAction<IImportPigExpanded>) => {
        //     const data: IImportPig = { ...action.payload }
        //     // setTimeout(() => {
        //     //     importPigFromAI(action.payload.cameraId, data)
        //     //         .then((res: any) => {
        //     //             console.log(res);
        //     //         })
        //     //         .catch((err) => {
        //     //             console.log('err:' + JSON.stringify(err));
        //     //         });
        //     // }, 2200)
        // },
        // getAllPens: (state, action: PayloadAction<any>) => {
        //     const params = {
        //         offset: UtilPage.calculateOffset(page),
        //         size: CFG_SIZE_PAGINATION,
        //         farmId: currentFarm.id,
        //         name: '',
        //         area: 0,
        //         weightTypeId: '',
        //     };

        //     apiPen
        //         .getAllPen(params)
        //         .then((res: any) => {
        //             setPens(res.items);
        //             setTotalPen(res.total);
        //             const numberPage = UtilPage.calculateNumberPage(res.total);
        //             setTotal(numberPage);
        //             isDelete && setPage(numberPage);
        //         })
        //         .catch((err) => {
        //             console.log(err);
        //         });
        // };
    }
})

const fetchListCamera$: RootEpic = (action$: any) => action$.pipe(
    filter(fetchListCameraRequest.match),
    switchMap((action: any) => {
        // const queryString = Utils.querySearchToString(action.payload)
        console.log(action.payload);
        const queryString = action.payload;

        return CameraAPI.getListCamera(queryString).pipe(
            map((res: any) => {
                console.log(res);
                return cameraSlice.actions.fetchListCameraSuccess(res.data)
            }), catchError((err) => {
                return [cameraSlice.actions.messageError(err.message)]
            })
        )
    })
)

const restartAnalysisCamera$: RootEpic = (action$: any) => action$.pipe(
    filter(restartAnalysisCameraReq.match),
    switchMap((action: any) => {
        return StreamAPI.analysisCamera(action.payload.analysisCamId).pipe(
            mergeMap((res: any) => {
                return [
                    cameraSlice.actions.restartAnalysisCameraSuccess(res), 
                    // cameraSlice.actions.importPigRequest(action.payload.importPigReqBody)
                ]
            }), catchError((err) => {
                return [cameraSlice.actions.messageError(err.message), cameraSlice.actions.restartAnalysisCameraFailed(err)]
            })
        )
    })
)

const addNewCamera$: RootEpic = (action$: any) => action$.pipe(
    filter(addCameraRequest.match),
    switchMap((action: any) => {
        console.log(action.payload);
        return CameraAPI.addNewCamera(action.payload).pipe(
            mergeMap((res: any) => {
                return [
                    cameraSlice.actions.addCameraSuccess(res.data),
                    cameraSlice.actions.fetchListCameraRequest(action.payload.warehouseId)
                ]
            }), catchError((err) => {
                return [cameraSlice.actions.messageError(err.message), cameraSlice.actions.restartAnalysisCameraFailed(err)]
            })
        )
    })
)

const getCameraById$: RootEpic = (action$: any) => action$.pipe(
    filter(getCameraByIdRequest.match),
    switchMap((action: any) => {
        // const queryString = Utils.querySearchToString(action.payload)
        console.log(action.payload);
        const queryString = action.payload;

        return CameraAPI.getCameraById(queryString).pipe(
            map((res: any) => {
                console.log(res);
                return cameraSlice.actions.getCameraByIdSuccess(res.data)
            }), catchError((err) => {
                return [cameraSlice.actions.getCameraByIdFail(err.message)]
            })
        )
    })
)

const deleteCameraById$: RootEpic = (action$: any) => action$.pipe(
    filter(deleteCameraRequest.match),
    switchMap((action: any) => {
        // const queryString = Utils.querySearchToString(action.payload)
        console.log(action.payload);
        const queryString = action.payload;

        return CameraAPI.deleteCameraById(queryString).pipe(
            map((res: any) => {
                console.log(res);
                return [
                    cameraSlice.actions.deleteCameraSuccess(action.payload),
                    // cameraSlice.actions.fetchListCameraRequest(action.payload)
                ]
            }), catchError((err) => {
                return [cameraSlice.actions.deleteCameraFail()]
            })
        )
    })
)

export const CameraEpics = [
    fetchListCamera$,
    restartAnalysisCamera$,
    addNewCamera$,
    getCameraById$,
    deleteCameraById$
]

export const {
    setIsExpandCamera,
    setIsExpandLog,
    fetchListCameraRequest,
    fetchListCameraSuccess,
    connectionCamera,
    setListCameraGrid,
    deleteCameraRequest,
    setDefaultSate,
    addMedia,
    fetchErrorCode,
    restartAnalysisCameraReq,
    addCameraRequest,
    getCameraByIdRequest
} = cameraSlice.actions;
export const cameraReducer = cameraSlice.reducer;