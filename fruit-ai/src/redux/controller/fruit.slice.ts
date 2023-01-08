import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { catchError, filter, mergeMap, switchMap } from "rxjs/operators";
import { IWareHouse, WarehouseRequest } from "../../common/define-fruit";
import { RootEpic } from "../../common/define-type";
import FruitAPI from "../../api/fruit.api";
import Utils from "../../common/utils";
import WarehouseAPI from "../../api/warehouse.api";
import { AddWarehouseRequest } from "../../common/define-warehouse";
import { satisfies } from "semver";
interface FruitState {
    sliceLstWarehouses: IWareHouse[],
    sliceWarehouses: IWareHouse | null,
    message: string,
    loading: boolean,
    successRes: any,
    failRes: any
}
const initialStateBootstrap: FruitState = {
    sliceLstWarehouses: [],
    sliceWarehouses: null,
    message: '',
    loading: false,
    successRes: null,
    failRes: null
}

const fruitSlice = createSlice({
    name: 'fruit',
    initialState: initialStateBootstrap,
    reducers: {
        setWareHouse: (state, action: PayloadAction<IWareHouse>) => {
            Utils.setLocalStorage('warehouseId', action.payload.id);
            state.sliceWarehouses = action.payload
            console.log('----setWareHouse state----');
            console.log(action.payload);
        },
        // },
        // Get task Request
        getAllWarehouseByUserIdRequest: (state, action: PayloadAction<WarehouseRequest>) => {
            state.loading = true;
            console.log('----check request get all WarehouseByUserId----');
            
        },
        getAllWarehouseByUserIdSuccess: (state, action: PayloadAction<IWareHouse[]>) => {
            state.sliceLstWarehouses = action.payload;
            state.loading = false;
            console.log('----success get all Warehouse By User Id----')
            console.log(action.payload);
        },
        getAllWarehouseByUserIdFailed(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
            console.log('----------failed get all Warehouse By User Id----------')

        },
        addWarehouseByUserIdRequest(state,action: PayloadAction<AddWarehouseRequest>){
            state.loading = true
        },
        addWarehouseByUserIdSuccess(state){
            state.loading = false;
        },
        addWarehouseByUserIdFail(state){
            state.loading = false
        }
    }
})
const getAllWarehouseByUserId$: RootEpic = action$ =>
    action$.pipe(filter(getAllWarehouseByUserIdRequest.match),
        switchMap((re) => {
            return FruitAPI.getWarehousesByUserId(re.payload).pipe(
                mergeMap((res: any) => {
                    return [fruitSlice.actions.getAllWarehouseByUserIdSuccess(res.data.items)];
                }),
                catchError(err => {
                    console.log(err)
                    return [fruitSlice.actions.getAllWarehouseByUserIdFailed(false)]
                }),
            );
        }),
    );

const addWarehouseByUserId$: RootEpic = action$ =>
    action$.pipe(filter(addWarehouseByUserIdRequest.match),
        switchMap((re) => {
            return WarehouseAPI.addWarehouseByIdUser(re.payload).pipe(
                mergeMap((res: any) => {
                    return [
                        fruitSlice.actions.addWarehouseByUserIdSuccess(),
                        fruitSlice.actions.getAllWarehouseByUserIdRequest(
                            {
                                userId: re.payload.userId,
                                additionalProp1: {}
                            }    
                        )
                    ];
                }),
                catchError(err => {
                    console.log(err)
                    return [fruitSlice.actions.getAllWarehouseByUserIdFailed(false)]
                }),
            );
        }),
    );
// const getTasksByName$: RootEpic = action$ =>
//     action$.pipe(filter(getTasksByNameRequest.match),
//         switchMap((re) => {
//             return MeetingsApi.getTasksByName(re.payload).pipe(
//                 mergeMap((res: any) => {
//                     // console.log(res);
//                     return [calendarSlice.actions.getTasksByNameSuccess(res.data.items)];
//                 }),
//                 catchError(err => {
//                     console.log(err)
//                     return [calendarSlice.actions.getTasksByNameFailed(false)]
//                 }),
//             );
//         }),
//     );
// const getTaskById$: RootEpic = action$ =>
//     action$.pipe(filter(getTaskByIdRequest.match),
//         switchMap((re: any) => {
//             console.log(re);
//             return MeetingsApi.getTaskById(re.payload).pipe(
//                 mergeMap((res: any) => {
//                     console.log(res);
//                     return [calendarSlice.actions.getTaskByIdSuccess(res.data)];
//                 }),
//                 catchError(err => {
//                     console.error(err)
//                     return [calendarSlice.actions.getTaskByIdFailed(false)]
//                 }),
//             );
//         }),
//     );

export const FruitEpics = [
    getAllWarehouseByUserId$,
    addWarehouseByUserId$
];

export const {
    getAllWarehouseByUserIdRequest,
    setWareHouse,
    addWarehouseByUserIdRequest
} = fruitSlice.actions;
export const fruitReducer = fruitSlice.reducer;
