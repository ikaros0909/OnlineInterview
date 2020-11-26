// import React from 'react';
import { View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Text } from 'react-native';
import S from 'styled-components';
import T from 'prop-types';

import { H_Scale } from '../../utils/iilliil';

const { vs, s, ds, ms } = H_Scale;

const AppCodePresenter = (props) => {
  const { themeColors, inputAppCode, setInputAppCode, handleUnivLogin } = props;
  const { CONTENTS_BOX_COLOR, THEME_COLOR, THEME_BUTTON_TEXT_COLOR, INACTIVE_COLOR } = themeColors;

  const _TextInput = (value, onChangeText, keyboardType, placeholder, secureTextEntry) => {
    return (
      <TextInput
        style={{
          width: '100%',
          height: '100%',
          textAlign: 'center',
          fontWeight: 'bold',
          color: THEME_COLOR,
          letterSpacing: value.length > 0 ? 10 : 0,
          paddingVertical: 0,
        }}
        maxLength={4}
        fontSize={ds(36)}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        placeholderTextColor={INACTIVE_COLOR}
        onChangeText={onChangeText}
        value={value}
      />
    );
  };

  return (
    <KeyboardAvoidingView enabled behavior={Platform.select({ ios: 'padding', android: null })} style={{ flex: 1, backgroundColor: CONTENTS_BOX_COLOR }}>
      <TopMarginSection />

      <View style={{ flex: 0.25 }}>
        <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center', marginBottom: vs(10) }}>
          <Image resizeMode="contain" source={require('../../assets/images/logo_s.png')} style={{ width: s(450), height: vs(123), marginBottom: vs(15) }} />
        </View>
        <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: ds(66), fontWeight: 'bold', color: THEME_COLOR }}>녹화관리시스템</Text>
        </View>
      </View>
      <View style={{ flex: 0.09 }} />

      <View style={{ flex: 0.09, flexDirection: 'row' }}>
        <SideMarginSection />
        <View style={{ flex: 0.5, alignItems: 'flex-start', borderBottomColor: INACTIVE_COLOR, borderBottomWidth: vs(2) }}>
          {_TextInput(inputAppCode, setInputAppCode, 'default', 'AppCode를 입력해주세요.', false)}
        </View>
        <SideMarginSection />
      </View>

      <MiddleMarginSection />

      <View style={{ flex: 0.09, flexDirection: 'row' }}>
        <SideMarginSection />
        <TouchableOpacity
          onPress={() => handleUnivLogin(inputAppCode)}
          style={{ flex: 0.5, backgroundColor: THEME_COLOR, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text style={{ fontSize: ds(32), fontWeight: 'bold', color: THEME_BUTTON_TEXT_COLOR }}>확인</Text>
        </TouchableOpacity>
        <SideMarginSection />
      </View>

      <BottomMarginSection />
    </KeyboardAvoidingView>
  );
};
AppCodePresenter.propTypes = {
  themeColors: T.object,
  AppCode: T.string,
  inputAppCode: T.string,
  setInputAppCode: T.func,
  handleUnivLogin: T.func,
};

export default AppCodePresenter;

const TopMarginSection = S.View`
  flex:0.21
`;
const MiddleMarginSection = S.View`
  flex:0.07
`;
const BottomMarginSection = S.View`
  flex:0.16
`;
const SideMarginSection = S.View`
  flex:0.25
`;
