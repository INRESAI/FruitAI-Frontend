import { combineReducers } from "@reduxjs/toolkit";
import { combineEpics } from "redux-observable";
import { BoostrapEpics, FruitEpics, bootstrapReducer, fruitReducer } from './controller';
import { LoginEpics, loginReducer } from "./controller/login.slice";

const rootReducer = combineReducers({
    bootstrap: bootstrapReducer,
    login: loginReducer,
    fruit: fruitReducer
});

export const rootEpic = combineEpics(
    ...BoostrapEpics,
    ...LoginEpics,
    ...FruitEpics,
);
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;