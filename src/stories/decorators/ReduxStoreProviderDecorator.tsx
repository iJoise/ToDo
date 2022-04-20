import React, {ReactNode} from "react";
import {Provider} from "react-redux";
import {AppRootStateType} from "../../App/store";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {v1} from "uuid";
import {tasksReducer} from "../../store/task-reducer/tasks-reducer";
import {todolistsReducer} from "../../store/todolist-reducer/todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../../api/todolists-api";
import {appReducer} from "../../store/app-reducer/app-reducer";
import thunk from "redux-thunk";
import {authReducer} from "../../store/auth-reducer/auth-reducer";

const rootReducer = combineReducers({
   tasks: tasksReducer,
   todolists: todolistsReducer,
   app: appReducer,
   auth: authReducer,
})

const initialGlobalState = {
   todolists: [
      {id: "todolistId1", title: "What to learn", entityStatus: 'idle', filter: "all", addedDate: '', order: 0,}
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
         }
      ]
   },
   app: {
      error: null,
      status: 'idle',
      initialized: false
   },
   auth: {
      isLoggedIn: false
   }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType, applyMiddleware(thunk));

export const ReduxStoreProviderDecorator = (storyFn: () => ReactNode) => (
   <Provider
      store={storyBookStore}>{storyFn()}
   </Provider>)


