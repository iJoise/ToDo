import { authAPI, LoginParamsType, ResponseType, ResultsCode } from '../../../api/todolists-api';
import { setAppStatusAC } from '../../app-reducer/actions';
import { setIsLoggedInAC } from '../auth-reducer';
import { call, put, takeEvery } from 'redux-saga/effects';
import { handleServerAppError, handleServerNetworkError } from '../../../utils/error-utils';

export function* loginWorkerSaga({ data }: LoginType) {
  yield put(setAppStatusAC('loading'));
  try {
    const res: ResponseType = yield call(authAPI.auth, data);
    if (res.resultCode === ResultsCode.OK) {
      yield put(setIsLoggedInAC(true));
    } else {
      yield* handleServerAppError(res);
    }
  } catch (err) {
    yield* handleServerNetworkError(err);
  } finally {
    yield put(setAppStatusAC('succeeded'));
  }
}


export function* logoutWorkerSaga() {
  yield put(setAppStatusAC('loading'));
  try {
    const data: ResponseType = yield call(authAPI.logout);
    if (data.resultCode === ResultsCode.OK) {
      yield put(setIsLoggedInAC(false));
    } else {
      yield* handleServerAppError(data);
    }
  } catch (err) {
    yield* handleServerNetworkError(err);
  } finally {
    yield put(setAppStatusAC('succeeded'));
  }
}


export const login = (data: LoginParamsType) => ({ type: 'AUTH/LOGIN', data });
export const logout = () => ({ type: 'AUTH/LOGOUT' });

type LoginType = ReturnType<typeof login>

export function* loginWatcherSaga() {
  yield takeEvery('AUTH/LOGIN', loginWorkerSaga);
  yield takeEvery('AUTH/LOGOUT', logoutWorkerSaga);
}
