import produce from 'immer';

export const EVALOFFICER_KEY = 'EVALOFFICER';
export const EVALOFFICER_LOG_IN_REQUEST = 'EVALOFFICER_LOG_IN_REQUEST';
export const EVALOFFICER_LOG_IN_SUCCESS = 'EVALOFFICER_LOG_IN_SUCCESS';
export const EVALOFFICER_LOG_IN_FAILURE = 'EVALOFFICER_LOG_IN_FAILURE';

const initialState = {
  info: null,
};

export const evalOfficerLoginRequest = (data) => {
  return {
    type: EVALOFFICER_LOG_IN_REQUEST,
    data,
  };
};

export const evalOfficerLoginSuccess = (evalOfficerInfo) => {
  return {
    type: EVALOFFICER_LOG_IN_SUCCESS,
    data: evalOfficerInfo,
  };
};

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case EVALOFFICER_LOG_IN_REQUEST: {
        draft.info = null;
        break;
      }
      case EVALOFFICER_LOG_IN_SUCCESS: {
        const info = action.data;
        draft.info = info;
        break;
      }
      case EVALOFFICER_LOG_IN_FAILURE: {
        draft.info = null;
        break;
      }
      default: {
        break;
      }
    }
  });
};

export default reducer;
