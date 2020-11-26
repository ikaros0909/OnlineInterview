import React, { useRef } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { RNCamera } from 'react-native-camera';
import T from 'prop-types';
import S from 'styled-components';

import { H_Scale, H_Colors } from '../../utils/iilliil';
const { vs, s, ds, ms, WINDOW_HEIGHT, WINDOW_WIDTH } = H_Scale;

const QRScannerPresenter = (props) => {
  const camRef = useRef();
  const {
    adminMode,
    inputValue,
    examSetInfo,
    scanned,
    scannig,
    inputting,
    setInputValue,
    handleInputValue,
    handleCodeScanned,
    onScanning,
    offScanning,
    onInputting,
    offInputting,
  } = props;

  const fontSize_small = adminMode ? ds(12) : ds(25);
  const fontSize = adminMode ? ds(24) : ds(50);
  const fontSize_description = adminMode ? ds(16) : ds(38);

  if (scannig) {
    return (
      <View style={{ flex: 1, overflow: 'hidden' }}>
        <RNCamera
          ref={camRef}
          style={{ flex: 1, width: '100%' }}
          type={RNCamera.Constants.Type.front}
          flashMode={RNCamera.Constants.FlashMode.off}
          onBarCodeRead={scanned ? undefined : handleCodeScanned}
        >
          <Col>
            <View style={{ flex: 4, width: '100%', backgroundColor: 'rgba(80,80,80, 0.7)' }}>
              <View style={{ flex: 1, width: '100%', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                <View style={{ flex: 3 }} />
                <Text
                  style={{ fontSize: fontSize_description, color: 'white', fontWeight: 'bold', textAlign: 'right' }}
                >{`QR코드가 화면에 나타나게 해주세요.`}</Text>
                <TouchButton onPress={offScanning} activeOpacity={0.65}>
                  <Text style={{ fontWeight: 'bold', textAlign: 'center', color: 'white', fontSize }}>QR코드 스캔 취소</Text>
                </TouchButton>
              </View>
            </View>
          </Col>
        </RNCamera>
      </View>
    );
  } else if (inputting) {
    return (
      <View style={{ flex: 1 }}>
        <Col>
          <View
            style={{
              flex: 4,
              width: '100%',
              backgroundColor: 'black',
            }}
          >
            <View
              style={{
                flex: 1,
                width: '100%',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
              }}
            >
              <View style={{ flex: 3, width: '100%' }}>
                <TextInput
                  value={inputValue}
                  onChangeText={setInputValue}
                  autoFocus={true}
                  placeholder={`${examSetInfo.howVrNo === 'N' ? '수험번호' : '가번호'}를 입력해주세요.`}
                  style={{ flex: 1, color: H_Colors.grey[5], fontSize, fontWeight: 'bold', textAlign: 'center', paddingVertical: 0 }}
                />
              </View>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <TouchButton onPress={handleInputValue} activeOpacity={0.65}>
                  <Text style={{ fontWeight: 'bold', textAlign: 'center', color: 'white', fontSize }}>완료</Text>
                </TouchButton>
                <TouchButton onPress={offInputting} activeOpacity={0.65}>
                  <Text style={{ fontWeight: 'bold', textAlign: 'center', color: 'white', fontSize }}>취소</Text>
                </TouchButton>
              </View>
            </View>
          </View>
        </Col>
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ flex: 1, width: '100%', backgroundColor: 'black' }} />
        <View style={{ flex: 4, width: '100%' }}>
          <TouchButton onPress={onScanning} activeOpacity={0.65}>
            <Text style={{ fontWeight: 'bold', textAlign: 'center', color: 'white', fontSize }}>QR코드 스캔하기</Text>
          </TouchButton>
        </View>
        <View style={{ flex: 1, width: '100%', flexDirection: 'row' }}>
          <TouchButton onPress={onInputting} activeOpacity={0.65}>
            <Text style={{ fontWeight: 'bold', textAlign: 'center', color: 'white', fontSize: fontSize_small }}>직접입력</Text>
          </TouchButton>
          <View style={{ flex: 4, backgroundColor: 'black' }} />
        </View>
      </View>
    );
  }
};

QRScannerPresenter.propTypes = {
  scanned: T.bool,
  handleCodeScanned: T.func,
  setScannig: T.func,
};

export default QRScannerPresenter;

const Container = S.View`
  flex: 1;
  align-items: center
  justify-content: center
  background-color: black
`;
const Col = S.View`
  flex:1;
  align-items: flex-start
  justify-content: flex-start
`;
const TouchButton = S.TouchableOpacity`
  flex: 1
  width: 100%
  align-items: center
  justify-content: center
  background-color: black
`;

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});
