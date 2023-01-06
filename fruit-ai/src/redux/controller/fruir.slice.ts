import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { catchError, filter, mergeMap, switchMap } from "rxjs/operators";
interface FruitState {
    message: string,
    loading: boolean,
    sliceIsLogin: boolean,
    successRes: any,
    failRes: any
}
const initialStateBootstrap: FruitState = {
    message: '',
    loading: false,
    sliceIsLogin: false,
    successRes: null,
    failRes: null
}

const fruitSlice = createSlice({
    name: 'fruit',
    initialState: initialStateBootstrap,
    reducers: {
        setIsLogin: (state, action: PayloadAction<boolean>) => {
            state.sliceIsLogin = action.payload
            console.log('----check login state----');
            console.log(action.payload);
            
        },
        // Get task Request
        getTasksRequest: (state, action: PayloadAction<any>) => {

        },
        getTasksSuccess: (state, action: PayloadAction<any>) => {

        },
        getTasksFailed(state, action: PayloadAction<boolean>) {

        },
    }
})
// const getTasks$: RootEpic = action$ =>
//     action$.pipe(filter(getTasksRequest.match),
//         switchMap((re) => {
//             return MeetingsApi.getTasks(re.payload).pipe(
//                 mergeMap((res: any) => {
//                     return [calendarSlice.actions.getTasksSuccess(res.data.items)];
//                 }),
//                 catchError(err => {
//                     console.log(err)
//                     return [calendarSlice.actions.getTasksFailed(false)]
//                 }),
//             );
//         }),
//     );
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

];

export const {
    setIsLogin
} = fruitSlice.actions;
export const fruitReducer = fruitSlice.reducer;
