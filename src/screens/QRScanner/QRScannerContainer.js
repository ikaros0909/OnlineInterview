import React, { useState } from 'react';
import { throttle } from 'lodash';

import StuScannerPresenter from './QRScannerPresenter';

import { H_RN } from '../../utils/iilliil';

const { alertConfirm } = H_RN;

const QRScannerContainer = (props) => {
  const { adminMode, inputValue, examSetInfo, stuSetInfo, scannig, inputting, setInputValue, setScannig, setInputting, scanStu } = props;
  const [scanned, setScanned] = useState(false);

  const getSingleStuSetInfo = (VrNo_or_SuhumNo) => {
    let singleStuSetInfo = null;
    if (examSetInfo.howVrNo === 'N') {
      singleStuSetInfo = Object.values(stuSetInfo.bySuhumNo).find((data) => data.SuhumNo === VrNo_or_SuhumNo);
    } else {
      singleStuSetInfo = Object.values(stuSetInfo.bySuhumNo).find((data) => data.VrNo === VrNo_or_SuhumNo);
    }
    return singleStuSetInfo;
  };

  const handleInputValue = () => {
    if (!inputValue || inputValue.trim() === '') {
      return alertConfirm({ desc: '입력해주세요.' });
    }

    const singleStuSetInfo = getSingleStuSetInfo(inputValue);
    if (!singleStuSetInfo) {
      alertConfirm({
        desc: `[ ${inputValue} ]는 고사 대상이 아닙니다.`,
      });
    } else {
      const { SelTypeCode, SelTypeName, MajorCode, MajorName, SuhumNo, StuName } = singleStuSetInfo;

      alertConfirm({
        title: '고사 대상이 맞습니까?',
        desc: `모집전형: ${SelTypeName} \n모집단위: ${MajorName} \n수험번호 ${inputValue} \n성명: ${StuName}`,
        okFunc: () => {
          setInputting(false);
          scanStu(SuhumNo);
        },
        cancelFunc: () => {
          setInputValue(null);
        },
      });
    }
    return setInputValue(null);
  };

  const handleCodeScanned = async (e) => {
    if (!scannig) return;
    setScanned(true);
    const { data } = e;
    const VrNo_or_SuhumNo = data;
    const singleStuSetInfo = getSingleStuSetInfo(VrNo_or_SuhumNo);

    if (!singleStuSetInfo) {
      await alertConfirm({
        desc: `[ ${VrNo_or_SuhumNo} ]는 고사 대상이 아닙니다.`,
        okFunc: () => setScanned(false),
      });
      return;
    }

    const { SelTypeCode, SelTypeName, MajorCode, MajorName, SuhumNo, StuName } = singleStuSetInfo;
    await alertConfirm({
      title: '고사 대상이 맞습니까?',
      desc: `모집전형: ${SelTypeName} \n모집단위: ${MajorName} \n수험번호 ${VrNo_or_SuhumNo} \n성명: ${StuName}`,
      okFunc: () => {
        setScanned(false);
        setScannig(false);
        scanStu(SuhumNo);
      },
      cancelFunc: () => {
        setScanned(false);
      },
    });
  };

  const onScanning = () => {
    setScannig(true);
  };

  const offScanning = () => {
    setScannig(false);
  };

  const onInputting = () => {
    setInputting(true);
  };

  const offInputting = () => {
    setInputting(false);
    setInputValue(null);
  };

  return (
    <StuScannerPresenter
      adminMode={adminMode}
      inputValue={inputValue}
      examSetInfo={examSetInfo}
      scanned={scanned}
      scannig={scannig}
      inputting={inputting}
      setInputValue={setInputValue}
      handleInputValue={handleInputValue}
      handleCodeScanned={handleCodeScanned}
      onScanning={onScanning}
      offScanning={offScanning}
      onInputting={onInputting}
      offInputting={offInputting}
    />
  );
};

export default QRScannerContainer;
