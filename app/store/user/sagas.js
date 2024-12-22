import { all, call, put, takeLatest } from 'redux-saga/effects';
import { init } from './actions';
import { MainActions } from './reducers';

async function getInitialData() {
  const data = await Promise.resolve([1, 2, 3]);

  return data;
}

export function* getInitialDataSaga() {
  try {
    const data = yield call(getInitialData);
    yield put(MainActions.getMainData(data));
    return data;
  } catch {
    console.log('api fail');
  }
}

export function* handleInitialize() {
  try {
    yield call(getInitialDataSaga);
  } catch {
    console.log('error');
  }
}

export function* watchInit() {
  yield takeLatest(init, handleInitialize);
}

export function* rootSaga() {
  yield all([watchInit()]);
}
