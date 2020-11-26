import { all, call, fork, put, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import { EVALOFFICER_LOG_IN_REQUEST, EVALOFFICER_LOG_IN_SUCCESS, EVALOFFICER_LOG_IN_FAILURE } from '../reducers/evalOfficer';

const evaOfficerlLoginAPI = (data) => {
  return axios.post('/api/rms/evalOfficer/login', { params: data });
};

function* evaOfficerlLogin(action) {
  try {
    const response = yield call(evaOfficerlLoginAPI, action.data);
    yield put({
      type: EVALOFFICER_LOG_IN_SUCCESS,
      data: response.data,
    });
  } catch (error) {
    yield put({
      type: EVALOFFICER_LOG_IN_FAILURE,
      error: error?.response.data || error,
    });
  }
}

function* watchEvalLogin() {
  yield takeLatest(EVALOFFICER_LOG_IN_REQUEST, evaOfficerlLogin);
}

export default function* loginSaga() {
  yield all([fork(watchEvalLogin)]);
}
