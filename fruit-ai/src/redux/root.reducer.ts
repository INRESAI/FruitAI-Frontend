import { combineReducers } from "@reduxjs/toolkit";
import { combineEpics } from "redux-observable";
import {  BoostrapEpics, bootstrapReducer} from './controller';
import { LoginEpics, loginReducer } from "./controller/login.slice";

const rootReducer = combineReducers({
    bootstrap: bootstrapReducer,
    login: loginReducer,
    // calendar: calendarReducer
});

export const rootEpic = combineEpics(
    ...BoostrapEpics,
    ...LoginEpics,
    // ...CalendarEpics
);
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;