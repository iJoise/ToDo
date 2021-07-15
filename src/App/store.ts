import {applyMiddleware, combineReducers, createStore} from "redux";
import {todolistsReducer} from "../features/TodolistsList/todolists-reducer";
import {tasksReducer} from "../features/TodolistsList/tasks-reducer";
import thunk from "redux-thunk";

const rootReducers = combineReducers({
todolists: todolistsReducer,
   tasks: tasksReducer,
})

export const store = createStore(rootReducers, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducers>

// @ts-ignore
window.store = store