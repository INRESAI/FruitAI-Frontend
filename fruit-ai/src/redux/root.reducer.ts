import { combineReducers } from "@reduxjs/toolkit";
import { combineEpics } from "redux-observable";
import { BoostrapEpics, FruitEpics, bootstrapReducer, fruitReducer } from './controller';
import { CameraEpics, cameraReducer } from "./controller/camera.slice";
import { LoginEpics, loginReducer } from "./controller/login.slice";

const rootReducer = combineReducers({
    bootstrap: bootstrapReducer,
    login: loginReducer,
    camera: cameraReducer,
    fruit: fruitReducer
});

export const rootEpic = combineEpics(
    ...BoostrapEpics,
    ...LoginEpics,
    ...CameraEpics,
    ...FruitEpics,
);
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;