import { applyMiddleware, combineReducers, createStore } from 'redux';
import { tasksReducer } from '../store/task-reducer/tasks-reducer';
import { appReducer } from '../store/app-reducer/app-reducer';
import { authReducer } from '../store/auth-reducer/auth-reducer';
import createSagaMiddleware from 'redux-saga';
import { todolistsReducer } from '../store/todolist-reducer/todolists-reducer';
import { taskWatcherSaga } from '../store/task-reducer/sagas';
import { appWatcherSaga } from '../store/app-reducer/sagas';
import { all } from 'redux-saga/effects';
import { loginWatcherSaga } from '../store/auth-reducer/sagas';
import { todolistWatcherSaga } from '../store/todolist-reducer/sagas';

const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
  app: appReducer,
  auth: authReducer,
});

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootWatcher);

function* rootWatcher() {
  yield all([appWatcherSaga(), taskWatcherSaga(), loginWatcherSaga(), todolistWatcherSaga()]);
}

export type AppRootStateType = ReturnType<typeof rootReducer>
