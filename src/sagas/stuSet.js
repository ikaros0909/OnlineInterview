import { all, call, fork, put, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import { LOAD_STUSET_REQUEST, LOAD_STUSET_SUCCESS, LOAD_STUSET_FAILURE } from '../reducers/stuSet';

const loadStuSetAPI = (data) => {
  return axios.get('/api/onInterview/stuSet', { params: data });
};

function* loadStuSet(action) {
  try {
    const response = yield call(loadStuSetAPI, action.data);
    const stuSetInfo = response.data.result.data[0];
    yield put({
      type: LOAD_STUSET_SUCCESS,
      payload: { stuSetInfo },
    });
  } catch (error) {
    yield put({
      type: LOAD_STUSET_FAILURE,
      error: error?.response.data || error,
    });
  }
}

function* watchLoadStuSet() {
  yield takeLatest(LOAD_STUSET_REQUEST, loadStuSet);
}

export default function* stuSetSaga() {
  yield all([fork(watchLoadStuSet)]);
}
