import { ResponseType } from '../api/todolists-api';
import { setAppErrorAC, setAppStatusAC } from '../store/app-reducer/actions';
import { put } from 'redux-saga/effects';

export function* handleServerAppError<D>(data: ResponseType<D>) {
   if (data.messages.length) {
      yield put(setAppErrorAC(data.messages[0]))
   } else {
     yield put(setAppErrorAC('Some error occurred'))
   }
  yield put(setAppStatusAC('failed'));
 }

 export function* handleServerNetworkError(err: { message: string}) {
   yield put(setAppErrorAC(err.message ? err.message : 'Some error occurred'))
   yield put(setAppStatusAC('failed'));
 }
