import { applyMiddleware, combineReducers, createStore } from 'redux';
import { tasksReducer } from '../store/task-reducer/tasks-reducer';
import thunk, { ThunkAction } from 'redux-thunk';
import { appReducer } from '../store/app-reducer/app-reducer';
import { authReducer, LoginActionsType } from '../store/auth-reducer/auth-reducer';
import createSagaMiddleware from 'redux-saga';
import { TodolistsActionsType, todolistsReducer } from '../store/todolist-reducer/todolists-reducer';
import { TasksActionsType } from '../store/task-reducer/types';
import { taskWatcherSaga } from '../store/task-reducer/sagas';
import { appWatcherSaga } from '../store/app-reducer/sagas';
import { AppActionType } from '../store/app-reducer/types';

const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
  app: appReducer,
  auth: authReducer,
});

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(rootReducer, applyMiddleware(thunk, sagaMiddleware));

sagaMiddleware.run(rootWatcher);

function* rootWatcher() {
  yield appWatcherSaga();
  yield taskWatcherSaga();
}


export type AppRootStateType = ReturnType<typeof rootReducer>
type AllActionsType = TodolistsActionsType | TasksActionsType | AppActionType | LoginActionsType
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AllActionsType>
