import { initializedAppWorkerSaga } from '../sagas';
import { call, put } from 'redux-saga/effects';
import { authAPI, MeResponseType, ResponseType } from '../../../api/todolists-api';
import { setIsLoggedInAC } from '../../auth-reducer/auth-reducer';
import { setAppInitializedAC } from '../actions';

let meResponse: ResponseType<MeResponseType>

beforeEach(() => {
  meResponse = {
    resultCode: 0,
    data: {
      login: '',
      id: 12,
      email: 'qwe',
    },
    messages: [],
    fieldsErrors: [],
  }
})

test('initializeAppWorkerSaga login success', () => {
  const gen = initializedAppWorkerSaga();
  let result = gen.next();

  expect(result.value).toEqual(call(authAPI.me));

  result = gen.next(meResponse);
  expect(result.value).toEqual(put(setAppInitializedAC(true)));

  result = gen.next();
  expect(result.value).toEqual(put(setIsLoggedInAC(true)));
});

test('initializeAppWorkerSaga login unsuccess', () => {
  const gen = initializedAppWorkerSaga();
  let result = gen.next();

  expect(result.value).toEqual(call(authAPI.me));

  meResponse.resultCode = 1
  result = gen.next(meResponse);
  expect(result.value).toEqual(put(setAppInitializedAC(true)));

  result = gen.next();
  expect(result.value).not.toEqual(put(setIsLoggedInAC(true)));
});
