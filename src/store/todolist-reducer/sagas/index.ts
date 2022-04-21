import { setAppStatusAC } from '../../app-reducer/actions';
import {
  CreateTodolistResponseType,
  ResponseType,
  ResultsCode,
  todolistsAPI,
  TodolistType,
} from '../../../api/todolists-api';
import {
  addTodolistAC,
  changeTodolistEntityStatusAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  setTodolistsAC,
} from '../actions';
import { call, put, takeEvery } from 'redux-saga/effects';
import { handleServerAppError, handleServerNetworkError } from '../../../utils/error-utils';

export function* fetchTodolistsWorkerSaga() {
  yield put(setAppStatusAC('loading'));
  try {
    const data: TodolistType[] = yield call(todolistsAPI.getTodolist);
    yield put(setTodolistsAC(data));
  } catch (err) {
    yield* handleServerNetworkError(err);
  } finally {
    yield put(setAppStatusAC('succeeded'));
  }
}

export function* addTodolistWorkerSaga({ title }: AddTodolist) {
  yield put(setAppStatusAC('loading'));
  try {
    const data: ResponseType<CreateTodolistResponseType> = yield call(todolistsAPI.createTodolist, title);
    if (data.resultCode === ResultsCode.OK) {
      yield put(addTodolistAC(data.data.item));
    } else {
      yield* handleServerAppError(data);
    }
  } catch (err) {
    yield* handleServerNetworkError(err);
  } finally {
    yield put(setAppStatusAC('succeeded'));
  }
}

export function* removeTodolistWorkerSaga({ todolistId }: RemoveTodolist) {
  yield put(setAppStatusAC('loading'));
  yield put(changeTodolistEntityStatusAC(todolistId, 'loading'));
  try {
    const data: ResponseType = yield call(todolistsAPI.deleteTodolist, todolistId);
    if (data.resultCode === ResultsCode.OK) {
      yield put(removeTodolistAC(todolistId));
    } else {
      yield* handleServerAppError(data);
    }
  } catch (err) {
    yield* handleServerNetworkError(err);
  } finally {
    yield put(setAppStatusAC('succeeded'));
  }
}

export function* changeTodolistTitleWorkerSaga({ title, todolistId}: ChangeTodolistTitle) {
  yield put(setAppStatusAC('loading'));
  try {
    const data: ResponseType = yield call(todolistsAPI.updateTodolistTitle, todolistId, title);
    if (data.resultCode === ResultsCode.OK) {
      yield put(changeTodolistTitleAC(todolistId, title));
    } else {
      handleServerAppError(data);
    }
  } catch (err) {
    handleServerNetworkError(err);
  } finally {
    yield put(setAppStatusAC('succeeded'));
  }
}


export const fetchTodolist = () => ({ type: 'TODOLIST/FETCH-TODOLISTS' });
export const addTodolist = (title: string) => ({ type: 'TODOLIST/ADD-TODOLISTS', title });
export const removeTodolist = (todolistId: string) => ({ type: 'TODOLIST/REMOVE-TODOLISTS', todolistId });
export const changeTodolistTitle = (todolistId: string, title: string) => ({
  type: 'TODOLIST/CHANGE-TODOLISTS',
  todolistId,
  title,
});

type AddTodolist = ReturnType<typeof addTodolist>;
type RemoveTodolist = ReturnType<typeof removeTodolist>;
type ChangeTodolistTitle = ReturnType<typeof changeTodolistTitle>;

export function* todolistWatcherSaga() {
  yield takeEvery('TODOLIST/FETCH-TODOLISTS', fetchTodolistsWorkerSaga);
  yield takeEvery('TODOLIST/ADD-TODOLISTS', addTodolistWorkerSaga);
  yield takeEvery('TODOLIST/REMOVE-TODOLISTS', removeTodolistWorkerSaga);
  yield takeEvery('TODOLIST/CHANGE-TODOLISTS', changeTodolistTitleWorkerSaga);
}
