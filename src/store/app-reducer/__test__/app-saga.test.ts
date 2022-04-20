import { initializedAppWorkerSaga } from '../sagas';
import { call } from 'redux-saga/effects';
import { authAPI } from '../../../api/todolists-api';

test('initializeAppWorkerSaga', () => {
  const gen = initializedAppWorkerSaga();
  const result = gen.next()

  expect(result.value).toEqual(call(authAPI.me))
});

export default () => {
}
