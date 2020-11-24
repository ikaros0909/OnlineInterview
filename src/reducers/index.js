import { combineReducers } from 'redux';

import db, { DB_KEY } from './db';
import univ, { UNIV_KEY } from './univ';
// import evalOfficer, { EVALOFFICER_KEY } from './evalOfficer';
import ipsiInfo, { IPSIINFO_KEY } from './ipsiInfo';
// import examSet, { EXAMSET_KEY } from './examSet';
import stuSet, { STUSET_KEY } from './stuSet';

export const initialReducer = {
  [DB_KEY]: db,
  [UNIV_KEY]: univ,
//   [EVALOFFICER_KEY]: evalOfficer,
  [IPSIINFO_KEY]: ipsiInfo,
//   [EXAMSET_KEY]: examSet,
  [STUSET_KEY]: stuSet,
};

export const createReducer = (asyncReducers) => {
  const rootReducer = combineReducers({
    ...initialReducer,
    ...asyncReducers,
  });
  return rootReducer;
};

export const rootReducer = createReducer();
