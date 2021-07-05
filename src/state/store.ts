import {combineReducers, createStore} from "redux";
import {todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";

const rootReducers = combineReducers({
todolists: todolistsReducer,
   tasks: tasksReducer,
})

export const store = createStore(rootReducers);

export type AppRootStateType = ReturnType<typeof rootReducers>

// @ts-ignore
window.store = store