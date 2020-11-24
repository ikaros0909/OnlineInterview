import produce from 'immer';
import axios from 'axios';

import { Jinhak_ApiUrl } from '../config';

export const UNIV_KEY = 'UNIV';
export const DELETE_UNIV = 'DELETE_UNIV';
export const UNIV_LOG_IN_REQUEST = 'UNIV_LOG_IN_REQUEST';
export const UNIV_LOG_IN_SUCCESS = 'UNIV_LOG_IN_SUCCESS';
export const UNIV_LOG_IN_FAILURE = 'UNIV_LOG_IN_FAILURE';

const initialState = {
  info: null,
};

export const deleteUniv = () => {
  return {
    type: DELETE_UNIV,
  };
};

export const univloginRequset = (data) => {
  return {
    type: UNIV_LOG_IN_REQUEST,
    data,
  };
};

export const univloginSuccess = (data) => {
  return {
    type: UNIV_LOG_IN_SUCCESS,
    data,
  };
};

const reducer = produce((draft, action) => {
  switch (action.type) {
    case DELETE_UNIV: {
      draft.info = null;
      break;
    }
    case UNIV_LOG_IN_REQUEST: {
      draft.info = null;
      break;
    }
    case UNIV_LOG_IN_SUCCESS: {
      const { data } = action.data.result;
      const info = data[0][0];
      draft.info = { ...info };
      // 학교 서버 안 쓰면 우리 서버 쓴다.
      if (!draft.info.ApiUrl) {
        draft.info.ApiUrl = Jinhak_ApiUrl;
      }
      axios.defaults.baseURL = draft.info.ApiUrl;
      break;
    }
    case UNIV_LOG_IN_FAILURE: {
      draft.info = null;
      break;
    }
    default: {
      break;
    }
  }
}, initialState);

export default reducer;
