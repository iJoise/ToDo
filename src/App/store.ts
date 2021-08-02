import {combineReducers} from "redux";
import {todolistsReducer} from "../features/TodolistsList/todolists-reducer";
import {tasksReducer} from "../features/TodolistsList/tasks-reducer";
import thunk, {ThunkAction} from "redux-thunk";
import {appReducer} from "./app-reducer";
import {authReducer} from "../features/Login/auth-reducer";
import {Action, configureStore} from "@reduxjs/toolkit";
import logger from "redux-logger";

const rootReducer = combineReducers({
   todolists: todolistsReducer,
   tasks: tasksReducer,
   app: appReducer,
   auth: authReducer
});

export const store = configureStore({
   reducer: rootReducer,
   middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk).concat(logger),
})

export type AppRootStateType = ReturnType<typeof rootReducer>


export type AppThunkType = ThunkAction<void, AppRootStateType, unknown, Action<string>>

