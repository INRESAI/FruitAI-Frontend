import { combineReducers } from "@reduxjs/toolkit";
import { combineEpics } from "redux-observable";
import {  BoostrapEpics, bootstrapReducer} from './controller';
import { CameraEpics, cameraReducer } from "./controller/camera.slice";
import { LoginEpics, loginReducer } from "./controller/login.slice";

const rootReducer = combineReducers({
    bootstrap: bootstrapReducer,
    login: loginReducer,
    camera: cameraReducer
    // calendar: calendarReducer
});

export const rootEpic = combineEpics(
    ...BoostrapEpics,
    ...LoginEpics,
    ...CameraEpics
    // ...CalendarEpics
);
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;