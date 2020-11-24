import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';

import rootSaga from '../sagas';
import { initialReducer, rootReducer } from '../reducers';
import { makePersistedReducer } from '../reducers/persistReducer';

const persistedReducer = makePersistedReducer(rootReducer);

const logActionLog = (store) => (next) => (action) => {
  console.log(action);
  next(action);
};

export const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [
    sagaMiddleware,
    // logActionLog
  ];

  const enhancer = composeWithDevTools(applyMiddleware(...middleware));

  const store = createStore(
    // rootReducer,
    persistedReducer,
    //initialState,
    enhancer,
  );
  let persistor = null;
  persistor = persistStore(store);

  // for saga
  store.sagaTask = sagaMiddleware.run(rootSaga);

  // Add a dictionary to keep track of the registered async reducers
  store.asyncReducers = { ...initialReducer };

  // lazy add reducer
  store.injectReducer = (key, asyncReducer) => {
    if (Object.hasOwnProperty.call(store.asyncReducers, key)) return console.log('이미 존재하는 키의 리듀서는 추가되지 않는다.');
    store.asyncReducers[key] = asyncReducer;
    store.replaceReducer(createReducer(store.asyncReducers));
    return store;
  };

  return { store, persistor };
};
