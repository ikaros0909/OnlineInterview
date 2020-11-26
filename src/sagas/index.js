import { all, call } from 'redux-saga/effects';

import univ from './univ';
import evalOfficer from './evalOfficer';
import ipsiInfo from './ipsiInfo';
import examSet from './examSet';
import stuSet from './stuSet';

export default function* rootSaga() {
  yield all([call(univ), call(ipsiInfo), call(evalOfficer), call(examSet), call(stuSet)]);
}
