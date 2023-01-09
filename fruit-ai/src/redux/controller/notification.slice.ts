import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { catchError, filter, mergeMap, switchMap } from "rxjs/operators";
import { IWareHouse, WarehouseRequest } from "../../common/define-fruit";
import { RootEpic } from "../../common/define-type";

import { AddWarehouseRequest } from "../../common/define-warehouse";
import NotificationAPI from "../../api/notification.api";
import { GetNotificationRequest, Notification } from "../../common/define-notification";
interface NotificationState {
    lstNotification: Notification[] | null,
    lstSeenNotification: Notification[],
    lstUnSeenNotification: Notification[],
    message: string,
    loading: boolean,
    successRes: any,
    failRes: any,
    numberOfUnseenNotification: number
}
const initialStateBootstrap: NotificationState = {
    lstNotification: [],
    lstSeenNotification: [],
    lstUnSeenNotification: [],
    message: '',
    loading: false,
    successRes: null,
    failRes: null,
    numberOfUnseenNotification: 0
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState: initialStateBootstrap,
    reducers: {

        // Call API lay tat ca thong bao
        getAllNotificationByIdUserRequest(state,action: PayloadAction<GetNotificationRequest>){
            console.log('hahahaha')
            state.loading = true
        },
        getAllNotificationByIdUserSuccess(state, action: PayloadAction<any>){
            state.lstNotification=action.payload.items
            let countInter = 0;
            console.log(state.lstNotification)
            state.lstUnSeenNotification = [] // reset lai mang moi khi call API lay thong bao
            state.lstSeenNotification = [] // reset lai mang moi khi call API lay thong bao
            state.lstNotification?.forEach(item => {
                if(item.status===0) { //la chua xem
                    countInter += 1 // Dem cac thong bao chua xem
                    state.lstUnSeenNotification.push(item)
                }
            })
            state.lstNotification?.forEach(item => {
                if(item.status===1) { //la da xem
                    state.lstSeenNotification.push(item)
                }
            })
            state.numberOfUnseenNotification = countInter
            console.log(state.lstUnSeenNotification)
            console.log(state.lstSeenNotification)
            state.loading = false;
        },
        getAllNotificationByIdUserFail(state){
            state.loading = false
        },

        // Set seen status 
        setStatusOfNotificationRequest(status, action: PayloadAction<string>){
            status.loading = true

        },
        setStatusOfNotificationSuccess(status){
            status.loading = false

        },
        setStatusOfNotificationFail(status){
            status.loading = false

        } 
    }
})


const getAllNotificationByIdUser$: RootEpic = action$ =>
    action$.pipe(filter(getAllNotificationByIdUserRequest.match),
        switchMap((re) => {
            console.log('hihihihihi')
            return NotificationAPI.getAllNotificationByIdUser(re.payload).pipe(
                mergeMap((res: any) => {
                    return [
                        notificationSlice.actions.getAllNotificationByIdUserSuccess(res.data),
                    ];
                }),
                catchError(err => {
                    console.log(err)
                    return [notificationSlice.actions.getAllNotificationByIdUserFail()]
                }),
            );
        }),
    );

const setNotificationSeenStatus$: RootEpic = action$ =>
action$.pipe(filter(setStatusOfNotificationRequest.match),
    switchMap((re) => {
        
        return NotificationAPI.setNotificationStatusById(re.payload).pipe(
            mergeMap((res: any) => {
                let userId = localStorage.getItem('userId') !== null ? localStorage.getItem('userId') : 'abc'
                if(userId){
                    userId = userId.slice(1);
                    userId = userId.slice(0, userId.length - 1);
                }
                return [
                    notificationSlice.actions.setStatusOfNotificationSuccess(),
                    // notificationSlice.actions.getAllNotificationByIdUserRequest(
                    //     {

                    //         userId: userId,
                    //         additionalProp1: {}
                    //     }
                    // )
                ];
            }),
            catchError(err => {
                console.log(err)
                return [notificationSlice.actions.getAllNotificationByIdUserFail()]
            }),
        );
    }),
);


export const NotificationEpics = [
    getAllNotificationByIdUser$,
    setNotificationSeenStatus$
];

export const {
    getAllNotificationByIdUserRequest,
    setStatusOfNotificationRequest
} = notificationSlice.actions;
export const notificationReducer = notificationSlice.reducer;
