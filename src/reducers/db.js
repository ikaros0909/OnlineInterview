import produce from 'immer';

export const DB_KEY = 'DB';
export const OPEN_DB = 'OPEN_DB';
export const DELETE_DB = 'DELETE_DB';

const initialState = { db: null };

export const openDB = (db) => {
  return {
    type: OPEN_DB,
    payload: { db },
  };
};

export const deleteDB = () => {
  return {
    type: DELETE_DB,
  };
};

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case OPEN_DB: {
        draft.db = action.payload.db;
        break;
      }
      case DELETE_DB: {
        draft.db = null;
        break;
      }
      default: {
        break;
      }
    }
  });
};

export default reducer;
