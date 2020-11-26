import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import axios from 'axios';

import AppCodePresenter from './AppCodePresenter';
import Loader from '../../utils/components/Loader';

import { Jinhak_ApiUrl } from '../../config';
import { openDB } from '../../reducers/db';
import { UNIV_KEY, univloginSuccess } from '../../reducers/univ';
import { H_Theme, H_RN } from '../../utils/iilliil';
import { openDatabase, promiseQuery } from '../../model/sqlite';
import { CREATE_QUERY, DROP_QUERY } from '../../model/query';
const { checkNetState, alertNotConnected, alertConfirm, setOption } = H_RN;

const AppCodeContainer = (props) => {
  const { navigation } = props;
  const univInfo = useSelector((state) => state[UNIV_KEY]?.info, shallowEqual);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [inputAppCode, setInputAppCode] = useState(univInfo?.AppCode || '');
  
  useEffect(() => {
    if (!univInfo || !univInfo.AppCode) return setLoading(false);
    handleUnivLogin(univInfo.AppCode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const prepareLocalDB = useCallback(
    async (univInfo) => {
      try {
        const { NEISCode } = univInfo;
        const db = await openDatabase(NEISCode);
        dispatch(openDB(db));

        // await promiseQuery(db, DROP_QUERY.tbRecordStuSet);
        await promiseQuery(db, CREATE_QUERY.tbRecordStuSet);
        await promiseQuery(db, CREATE_QUERY.tbRecordStuSetResult);
        return true;
      } catch (error) {
        console.log('[FAIL] prepareLocalDB', error);
        const desc = error.response?.data?.message || error.message;
        alertConfirm({ tilte: '로컬 DB설정 실패', desc });
        return false;
      }
    },
    [dispatch],
  );

  const requestUnivLogin = async (params) => {
    try {
      const response = await axios.post(`${Jinhak_ApiUrl}/api/rms/univ/login`, { params });
      const responseData = response.data;
      return responseData;
    } catch (error) {
      console.log('[FAIL] requestUnivLogin', error);
      const desc = error.response?.data?.message || error.message;
      alertConfirm({ tilte: '대학교 로그인 요청 실패', desc });
      return false;
    }
  };

  const handleUnivLogin = useCallback(
    async (AppCode) => {
      setLoading(true);
      const isConnected = await checkNetState();
      if (!isConnected) {
        setLoading(false);
        return alertNotConnected();
      }

      if (!AppCode || AppCode.trim().length === 0) {
        setLoading(false);
        return alertConfirm({ desc: 'AppCode를 입력해주세요.' });
      }

      try {
        const params = { AppCode };
        const responseData = await requestUnivLogin(params);
        if (!responseData) {
          throw Error();
        }
        // Redux
        dispatch(univloginSuccess(responseData));
        const univInfo = responseData.result.data[0][0];
        // SQLite
        const result = await prepareLocalDB(univInfo);
        if (!result) throw Error();
        // AsyncStorage
        const { NEISCode } = univInfo;
        setOption('NEISCode', NEISCode);
        axios.defaults.headers.common.neiscode = NEISCode;

        const success = await makeAppAuth(NEISCode);
        if (!success) throw new Error();

        // navigation.replace('SelExam');
      } catch (error) {
        setLoading(false);
      } finally {
      }
    },
    [makeAppAuth, prepareLocalDB, navigation, dispatch],
  );

  const makeAppAuth = useCallback(async (NEISCode) => {
    try {
      const authid = 'jinhak';
      setOption('authid', authid);
      axios.defaults.headers.common.authid = authid;
      const response = await axios.post(`/api/rms/univ/auth`, { NEISCode, authid });
      const { result } = response.data;
      const token = result;

      setOption('token', token);
      axios.defaults.headers.common.token = token;
      return true;
    } catch (error) {
      console.log('[FAILURE] makeAppAuth', error);
      const desc = error.response?.data?.message || error.message;
      alertConfirm({ title: '앱 인증 토크 생성 실패', desc });
      return false;
    }
  }, []);

  if (loading) {
    return <Loader />;
  }
  const NEISCode = univInfo?.NEISCode || null;
  const themeColors = H_Theme.getThemeColors(NEISCode);
  return <AppCodePresenter themeColors={themeColors} inputAppCode={inputAppCode} setInputAppCode={setInputAppCode} handleUnivLogin={handleUnivLogin} />;
};

export default AppCodeContainer;
