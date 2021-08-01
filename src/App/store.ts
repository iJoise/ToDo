import {combineReducers} from "redux";
import {TodolistsActionsType, todolistsReducer} from "../features/TodolistsList/todolists-reducer";
import {TasksActionsType, tasksReducer} from "../features/TodolistsList/tasks-reducer";
import thunk, {ThunkAction} from "redux-thunk";
import {AppActionType, appReducer} from "./app-reducer";
import {authReducer} from "../features/Login/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";
import logger from "redux-logger";

const rootReducer = combineReducers({
   todolists: todolistsReducer,
   tasks: tasksReducer,
   app: appReducer,
   auth: authReducer
});

// export const store = createStore(rootReducer, applyMiddleware(thunk));

export const store = configureStore({
   reducer: rootReducer,
   middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk).concat(logger),
})

export type AppRootStateType = ReturnType<typeof rootReducer>


type AllActionsType = TodolistsActionsType | TasksActionsType | AppActionType

export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AllActionsType>


// @ts-ignore
window.store = store

//| LoginActionsType