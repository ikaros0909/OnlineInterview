import produce from 'immer';

const initialState = {
  selectList: null,
  selectValue: null,
  info: null,
};

export const IPSIINFO_KEY = 'IPSIINFO';
export const RESET_IPSIINFO = 'RESET_IPSIINFO';
export const LOAD_IPSIINFO_SELECT_LIST_REQUEST = 'LOAD_IPSIINFO_SELECT_LIST_REQUEST';
export const LOAD_IPSIINFO_SELECT_LIST_SUCCESS = 'LOAD_IPSIINFO_SELECT_LIST_SUCCESS';
export const LOAD_IPSIINFO_SELECT_LIST_FAILURE = 'LOAD_IPSIINFO_SELECT_LIST_FAILURE';
export const SET_SELECT_VALUE = 'SET_SELECT_VALUE';

export const resetIpsiInfoAction = () => {
  return {
    type: RESET_IPSIINFO,
  };
};

export const ipsiInfoSelectListRequest = (data) => {
  return {
    type: LOAD_IPSIINFO_SELECT_LIST_REQUEST,
    data,
  };
};

export const ipsiInfoSelectListSuccess = (data) => {
  return {
    type: LOAD_IPSIINFO_SELECT_LIST_SUCCESS,
    data,
  };
};

export const setSelectValues = (data) => {
  return {
    type: SET_SELECT_VALUE,
    data,
  };
};

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case RESET_IPSIINFO: {
        draft.info = initialState.info;
        break;
      }
      case LOAD_IPSIINFO_SELECT_LIST_REQUEST: {
        draft.selectList = null;
        break;
      }
      case LOAD_IPSIINFO_SELECT_LIST_SUCCESS: {
        const { data } = action.data.result;
        const selectList = data[0];
        draft.selectList = selectList;
        break;
      }
      case LOAD_IPSIINFO_SELECT_LIST_FAILURE: {
        draft.selectList = null;
        break;
      }
      case SET_SELECT_VALUE: {
        draft.selectValue = action.data;
        break;
      }
      default: {
        break;
      }
    }
  });
};

export default reducer;
