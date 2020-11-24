import produce from 'immer';
import { combineReducers } from 'redux';

export const STUSET_KEY = 'STUSET';
export const LOAD_STUSET_REQUEST = 'LOAD_STUSET_REQUEST';
export const LOAD_STUSET_SUCCESS = 'LOAD_STUSET_SUCCESS';
export const LOAD_STUSET_FAILURE = 'LOAD_STUSET_FAILURE';
export const UPDATE_EVALSTATUS = 'UPDATE_EVALSTATUS';
export const UPDATE_DURATION_LOCALURI = 'UPDATE_DURATION_LOCALURI';
export const UPDATE_IS_FINAL_COMMIT = 'UPDATE_IS_FINAL_COMMIT';
export const UPDATE_RECORD_INFO = 'UPDATE_RECORD_INFO';
export const UPDATE_RECORD_FAILURE = 'UPDATE_RECORD_FAILURE';

export const loadStuSetRequest = (data) => {
  return {
    type: LOAD_STUSET_REQUEST,
    data,
  };
};

export const loadStuSetSucess = (newStuSetAll) => {
  return {
    type: LOAD_STUSET_SUCCESS,
    payload: { newStuSetAll },
  };
};

export const updateEvalStatus = ({ selStuSetInfo, ExamHallCode, EvalTime, EvalStatus }) => {
  return {
    type: UPDATE_EVALSTATUS,
    payload: {
      selStuSetInfo,
      ExamHallCode,
      EvalTime,
      EvalStatus,
    },
  };
};

export const updateDurationLocalUri = ({ selStuSetInfo, ExamHallCode, duration, LocalUri }) => {
  return {
    type: UPDATE_DURATION_LOCALURI,
    payload: { selStuSetInfo, ExamHallCode, duration, LocalUri },
  };
};

export const updateIsFinalCommit = ({ selStuSetInfo, ExamHallCode, EvalTime, isFinalCommit }) => {
  return {
    type: UPDATE_IS_FINAL_COMMIT,
    payload: { selStuSetInfo, ExamHallCode, EvalTime, isFinalCommit },
  };
};

export const handleRecordFailure = ({ selStuSetInfo, ExamHallCode, EvalTime, EvalStatus }) => {
  return {
    type: UPDATE_RECORD_FAILURE,
    payload: { selStuSetInfo, ExamHallCode, EvalTime, EvalStatus },
  };
};

export const updateRecordFilename = ({ selStuSetInfo, ExamHallCode, RecordFilename, EvalTime, EvalStatus }) => {
  return {
    type: UPDATE_RECORD_INFO,
    payload: {
      selStuSetInfo,
      ExamHallCode,
      RecordFilename,
      EvalTime,
      EvalStatus,
    },
  };
};

const allSuhumNo = produce((draft, action) => {
  switch (action.type) {
    case LOAD_STUSET_REQUEST: {
      return [];
    }
    case LOAD_STUSET_SUCCESS: {
      const { newStuSetAll } = action.payload;
      let newAllSuhumNo = newStuSetAll.map((data) => data.SuhumNo);
      newAllSuhumNo = newAllSuhumNo.sort((a, b) => {
        if (a > b) return 1;
        else if (a > b) return -1;
        return 0;
      });
      return newAllSuhumNo;
    }
    case LOAD_STUSET_FAILURE: {
      return [];
    }
    case UPDATE_EVALSTATUS: {
      return draft;
    }
    case UPDATE_IS_FINAL_COMMIT: {
      return draft;
    }
    case UPDATE_RECORD_INFO: {
      return draft;
    }
    case UPDATE_RECORD_FAILURE: {
      return draft;
    }
    case UPDATE_DURATION_LOCALURI: {
      return draft;
    }
    default: {
      return draft;
    }
  }
}, []);

const bySuhumNo = produce((draft, action) => {
  switch (action.type) {
    case LOAD_STUSET_REQUEST: {
      return {};
    }
    case LOAD_STUSET_SUCCESS: {
      const { newStuSetAll } = action.payload;
      let newState = {};
      for (const singleStuSetAll of newStuSetAll) {
        const { SuhumNo } = singleStuSetAll;
        newState = { ...newState, [SuhumNo]: singleStuSetAll };
      }
      return newState;
    }
    case LOAD_STUSET_FAILURE: {
      return {};
    }
    case UPDATE_RECORD_INFO: {
      const { selStuSetInfo, ExamHallCode, RecordFilename, EvalTime, EvalStatus } = action.payload;
      const { SuhumNo } = selStuSetInfo;
      draft[SuhumNo].ExamHallCode = ExamHallCode;
      draft[SuhumNo].EvalTime = EvalTime;
      draft[SuhumNo].RecordFilename = RecordFilename;
      draft[SuhumNo].EvalStatus = EvalStatus;
      return draft;
    }
    case UPDATE_DURATION_LOCALURI: {
      const { selStuSetInfo, ExamHallCode, duration, LocalUri } = action.payload;
      const { SuhumNo } = selStuSetInfo;
      draft[SuhumNo].ExamHallCode = ExamHallCode;
      draft[SuhumNo].Duration = duration;
      draft[SuhumNo].LocalUri = LocalUri;
      return draft;
    }
    case UPDATE_EVALSTATUS: {
      const { selStuSetInfo, ExamHallCode, EvalTime, EvalStatus } = action.payload;
      const { SuhumNo } = selStuSetInfo;
      draft[SuhumNo].ExamHallCode = ExamHallCode;
      draft[SuhumNo].EvalTime = EvalTime;
      draft[SuhumNo].EvalStatus = EvalStatus;
      // 결시 결격 한 경우
      if (EvalStatus === -1 || EvalStatus === -2) {
        draft[SuhumNo].RecordFilename = null;
        draft[SuhumNo].Duration = null;
        draft[SuhumNo].LocalUri = null;
      }
      return draft;
    }
    case UPDATE_RECORD_FAILURE: {
      const { selStuSetInfo, ExamHallCode, EvalTime, EvalStatus } = action.payload;
      const { SuhumNo } = selStuSetInfo;
      draft[SuhumNo].ExamHallCode = ExamHallCode;
      draft[SuhumNo].EvalTime = EvalTime;
      draft[SuhumNo].EvalStatus = EvalStatus;
      return draft;
    }
    case UPDATE_IS_FINAL_COMMIT: {
      const { selStuSetInfo, ExamHallCode, EvalTime, isFinalCommit } = action.payload;
      const { SuhumNo } = selStuSetInfo;
      draft[SuhumNo].ExamHallCode = ExamHallCode;
      draft[SuhumNo].EvalTime = EvalTime;
      draft[SuhumNo].isFinalCommit = isFinalCommit;
      return draft;
    }
    default: {
      return draft;
    }
  }
}, {});

export const reducer = combineReducers({
  bySuhumNo,
  allSuhumNo,
});

export default reducer;
