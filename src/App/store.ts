import {applyMiddleware, combineReducers, createStore} from "redux";
import {TodolistsActionsType, todolistsReducer} from "../features/TodolistsList/todolists-reducer";
import {TasksActionsType, tasksReducer} from "../features/TodolistsList/tasks-reducer";
import thunk, {ThunkAction} from "redux-thunk";
import {AppActionType, appReducer} from "./app-reducer";

const rootReducer = combineReducers({
todolists: todolistsReducer,
   tasks: tasksReducer,
   app: appReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>


type AllActionsType = TodolistsActionsType | TasksActionsType | AppActionType

export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AllActionsType>


// @ts-ignore
window.store = store