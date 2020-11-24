import axios from 'axios';
import { all, call, fork, put, takeLatest, takeEvery } from 'redux-saga/effects';

import { LOAD_IPSIINFO_SELECT_LIST_REQUEST, LOAD_IPSIINFO_SELECT_LIST_SUCCESS, LOAD_IPSIINFO_SELECT_LIST_FAILURE } from '../reducers/ipsiInfo';

const loadIpsiInfoSelectListAPI = (data) => {
  return axios.get('/api/onInterview/ipsiInfo/selectList', { params: data });
};

function* loadIpsiInfoSelectList(action) {
  try {
    const response = yield call(loadIpsiInfoSelectListAPI, action.data);
    yield put({
      type: LOAD_IPSIINFO_SELECT_LIST_SUCCESS,
      data: response.data,
    });
  } catch (error) {
    yield put({
      type: LOAD_IPSIINFO_SELECT_LIST_FAILURE,
      error: error?.response.data || error,
    });
  }
}

function* watchloadIpsiInfoSelectList() {
  yield takeLatest(LOAD_IPSIINFO_SELECT_LIST_REQUEST, loadIpsiInfoSelectList);
}

export default function* ipsiInfoSaga() {
  yield all([fork(watchloadIpsiInfoSelectList)]);
}
