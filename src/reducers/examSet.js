import produce from 'immer';

export const EXAMSET_KEY = 'EXAMSET';
export const RESET_EXAM = 'RESET_EXAM';
export const UPDATE_RECORD_FOLDER_NAME = 'UPDATE_RECORD_FOLDER_NAME';
export const LOAD_EXAMSET_REQUEST = 'LOAD_EXAMSET_REQUEST';
export const LOAD_EXAMSET_SUCCESS = 'LOAD_EXAMSET_SUCCESS';
export const LOAD_EXAMSET_FAILURE = 'LOAD_EXAMSET_FAILURE';

const initialState = {
  info: null,
};

export const resetExamSet = () => {
  return {
    type: RESET_EXAM,
  };
};

export const loadExamSetRequest = (data) => {
  return {
    type: LOAD_EXAMSET_REQUEST,
    data,
  };
};

export const loadExamSetSuccess = (examSetInfo) => {
  return {
    type: LOAD_EXAMSET_SUCCESS,
    payload: { examSetInfo },
  };
};

export const updateRecordFolderName = (RecordFolderName) => {
  return {
    type: UPDATE_RECORD_FOLDER_NAME,
    payload: { RecordFolderName },
  };
};

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case RESET_EXAM: {
        draft.info = initialState.info;
        break;
      }
      case UPDATE_RECORD_FOLDER_NAME: {
        const { RecordFolderName } = action.payload;
        draft.info.RecordFolderName = RecordFolderName;
        break;
      }
      case LOAD_EXAMSET_REQUEST: {
        draft.info = null;
        break;
      }
      case LOAD_EXAMSET_SUCCESS: {
        const { examSetInfo } = action.payload;
        draft.info = examSetInfo;
        break;
      }
      case LOAD_EXAMSET_REQUEST: {
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
