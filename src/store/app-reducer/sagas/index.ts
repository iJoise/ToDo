import { authAPI, MeResponseType, ResponseType, ResultsCode } from '../../../api/todolists-api';
import { call, put, takeEvery } from 'redux-saga/effects';
import { setIsLoggedInAC } from '../../auth-reducer/auth-reducer';
import { handleServerAppError, handleServerNetworkError } from '../../../utils/error-utils';
import { setAppInitializedAC } from '../actions';

export function* initializedAppWorkerSaga() {
  try {
    const data: ResponseType<MeResponseType> = yield call(authAPI.me);
    yield put(setAppInitializedAC(true));
    if (data.resultCode === ResultsCode.OK) {
      yield put(setIsLoggedInAC(true));
    } else {
      yield handleServerAppError(data);
    }
  } catch (err) {
    yield handleServerNetworkError(err);
  }
}

export const initializedApp = () => ({ type: 'APP/INITIALIZED-APP' });

export function* appWatcherSaga() {
  yield takeEvery('APP/INITIALIZED-APP', initializedAppWorkerSaga);
}
