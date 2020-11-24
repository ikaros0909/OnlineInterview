import axios from 'axios';
import { Jinhak_ApiUrl } from '../config';

import { all, call, fork, put, takeLatest, takeEvery } from 'redux-saga/effects';

import { UNIV_LOG_IN_REQUEST, UNIV_LOG_IN_SUCCESS, UNIV_LOG_IN_FAILURE } from '../reducers/univ';

const univLoginAPI = (data) => {
  return axios.post(`${Jinhak_ApiUrl}/api/rms/univ/login`, { params: data });
};

function* univLogin(action) {
  try {
    const response = yield call(univLoginAPI, action.data);
    if (response.data.result.count[0] < 1) {
      return yield put({
        type: UNIV_LOG_IN_FAILURE,
        error: '앱코드에 배정된 학교가 없습니다.',
      });
    }
    yield put({
      type: UNIV_LOG_IN_SUCCESS,
      data: response.data,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: UNIV_LOG_IN_FAILURE,
      error: error?.response.data || error,
    });
  }
}

function* watchUnivLogin() {
  yield takeLatest(UNIV_LOG_IN_REQUEST, univLogin);
}

export default function* univSaga() {
  yield all([fork(watchUnivLogin)]);
}

// Saga: next를 알아서 해주는 제너레이터 (이펙트에 따라 알아서 해준다.)
// call:            함수 동기적 호출 (api호출하는 함수에 많이 사용)
// fork:            함수 비동기적 호출
// put:             액션 dispatch
// take:            액션이 dispatch 될 때 take함수 안의 제너레이터를 next 한다. (반복안시키면 한번하고 끝나)
// takeLatest:      액션이 dispatch 될 때 두번째인자인 함수 호출 (마지막 호출만 실행, 끝나지 않은 이전 요청은 취소)
// takeEvery:       액션이 dispatch 될 때 두번째인자인 함수 호출 (모든 호출 실행)
