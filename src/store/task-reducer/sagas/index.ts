import { call, put, select, takeEvery } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import {
  CreateTaskResponseType,
  GetTaskResponse,
  ResponseType,
  ResultsCode,
  taskAPI,
} from '../../../api/todolists-api';
import { handleServerAppError, handleServerNetworkError } from '../../../utils/error-utils';
import { addTaskAC, removeTaskAC, setTasksAC, updateTaskAC } from '../actions';
import { AddTasks, FetchTasks, RemoveTasks, UpdateDomainTaskModelType, UpdateTask } from '../types';
import { getState } from '../selectors';
import { setAppStatusAC } from '../../app-reducer/actions';

export function* fetchTaskWorkerSaga(payload: FetchTasks) {
  yield put(setAppStatusAC('loading'));
  try {
    const res: AxiosResponse<GetTaskResponse> = yield call(taskAPI.getTasks, payload.todolistID);
    yield put(setTasksAC(res.data.items, payload.todolistID));
  } catch (err) {
    handleServerNetworkError(err, put);
  } finally {
    yield put(setAppStatusAC('succeeded'));
  }
}

export function* removeTaskWorkerSaga({ todolistID, taskId }: RemoveTasks) {
  yield put(setAppStatusAC('loading'));
  try {
    const res: AxiosResponse<ResponseType> = yield call(taskAPI.deleteTask, todolistID, taskId);
    if (res.data.resultCode === ResultsCode.OK) {
      yield put(removeTaskAC(taskId, todolistID));
    } else {
      handleServerAppError(res.data, put);
    }
  } catch (err) {
    handleServerNetworkError(err, put);
  } finally {
    yield put(setAppStatusAC('succeeded'));
  }
}

export function* addTaskWorkerSaga({ todolistID, title }: AddTasks) {
  yield put(setAppStatusAC('loading'));
  try {
    const res: AxiosResponse<ResponseType<CreateTaskResponseType>> = yield call(taskAPI.createTask, todolistID, title);
    if (res.data.resultCode === ResultsCode.OK) {
      yield put(addTaskAC(res.data.data.item));
    } else {
      handleServerAppError(res.data, put);
    }
  } catch (err) {
    handleServerNetworkError(err, put);
  } finally {
    yield put(setAppStatusAC('succeeded'));
  }
}

export function* updateTaskWorkerSaga({ taskId, domainModel, todolistId }: UpdateTask) {
  yield put(setAppStatusAC('loading'));
  try {
    const state = getState(yield select());
    const task = state.tasks[todolistId].find(t => t.id === taskId);
    if (!task) {
      console.warn('Task not found in the state');
      return;
    }
    const apiModel = {
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
      ...domainModel,
    };
    const res: AxiosResponse<ResponseType> = yield call(taskAPI.updateTask, todolistId, taskId, apiModel);
    if (res.data.resultCode === ResultsCode.OK) {
      yield put(updateTaskAC(taskId, domainModel, todolistId));
    } else {
      handleServerAppError(res.data, put);
    }
  } catch (err) {
    handleServerNetworkError(err, put);
  } finally {
    yield put(setAppStatusAC('succeeded'));
  }
}

export const fetchTasks = (todolistID: string) => ({ type: 'TASKS/FETCH-TASKS', todolistID });
export const removeTask = (taskId: string, todolistID: string) => ({ type: 'TASKS/REMOVE-TASK', taskId, todolistID });
export const addTask = (title: string, todolistID: string) => ({ type: 'TASK/ADD-TASK', title, todolistID });
export const updateTask = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) => (
  { type: 'TASKS/UPDATE-TASK', taskId, domainModel, todolistId }
);

export function* taskWatcherSaga() {
  yield takeEvery('TASKS/FETCH-TASKS', fetchTaskWorkerSaga);
  yield takeEvery('TASKS/REMOVE-TASK', removeTaskWorkerSaga);
  yield takeEvery('TASK/ADD-TASK', addTaskWorkerSaga);
  yield takeEvery('TASKS/UPDATE-TASK', updateTaskWorkerSaga);
}
