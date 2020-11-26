import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'; // https://github.com/rt2zz/redux-persist#state-reconciler

import { DB_KEY } from './db';
import { UNIV_KEY } from './univ';
import { EVALOFFICER_KEY } from './evalOfficer';
import { IPSIINFO_KEY } from './ipsiInfo';
import { EXAMSET_KEY } from './examSet';
import { STUSET_KEY } from './stuSet';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  version: -1,
  stateReconciler: hardSet,
  whitelist: [UNIV_KEY],
  balcklist: [DB_KEY, EVALOFFICER_KEY, IPSIINFO_KEY, EXAMSET_KEY, STUSET_KEY],
  // debug: true, // true -> verbose logs
  // migrate: createMigrate(migrations, { debug: true }),
  // transforms?: Array<Transform>,

  // throttle?: number, // ms to throttle state writes
  // keyPrefix?: string, // will be prefixed to the storage key
  // serialize?: boolean, // false -> do not call JSON.parse & stringify when setting & getting from storage
  // writeFailHandler?: Function, // will be called if the storage engine fails during setItem()
};

export const makePersistedReducer = (rootReducer) => {
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  return persistedReducer;
};
