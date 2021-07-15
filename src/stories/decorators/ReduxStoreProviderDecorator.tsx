import React, {ReactNode} from "react";
import {Provider} from "react-redux";
import {AppRootStateType, store} from "../../App/store";
import {combineReducers, createStore} from "redux";
import {v1} from "uuid";
import {tasksReducer} from "../../features/TodolistsList/tasks-reducer";
import {todolistsReducer} from "../../features/TodolistsList/todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../../api/todolists-api";

const rootReducer = combineReducers({
   tasks: tasksReducer,
   todolists: todolistsReducer
})

const initialGlobalState = {
   todolists: [
      {id: "todolistId1", title: "What to learn", filter: "all", addedDate: '', order: 0,},
   ],
   tasks: {
      ["todolistId1"]: [
         {
            id: v1(), title: "HTML&CSS",
            status: TaskStatuses.New,
            addedDate: '',
            deadline: '',
            description: '',
            order: 0,
            priority: TaskPriorities.low,
            startDate: '',
            todoListId: 'todolistId1'
         },
         {
            id: v1(), title: "JS",
            status: TaskStatuses.New,
            addedDate: '',
            deadline: '',
            description: '',
            order: 0,
            priority: TaskPriorities.low,
            startDate: '',
            todoListId: 'todolistId1'
         }
      ]
   }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType);

export const ReduxStoreProviderDecorator = (storyFn: () => ReactNode) => (
   <Provider
      store={storyBookStore}>{storyFn()}
   </Provider>)


