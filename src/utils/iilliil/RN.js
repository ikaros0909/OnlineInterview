import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';
import RNFS from 'react-native-fs';
import axios from 'axios';

import { Jinhak_ApiUrl } from '../../config';
import { handleCeilFloorRound } from './math';

// Android 라이브러리 < 갤러리에는 안나오는데 접근가능 : "/storage/emulated/0"
export const ExternalStorageDirectoryPath = RNFS.ExternalStorageDirectoryPath;
// IOS 라이브러리
export const LibraryDirectoryPath = RNFS.LibraryDirectoryPath;
// 앱 파일 경로 < 핸드폰으로 직접 접근 불가 : "/data/user/0/com.jinhak.rms/files"
export const DocumentDirectoryPath = RNFS.DocumentDirectoryPath;
// 캐시 경로 : "/data/user/0/com.jinhak.rms/cache"
export const CachesDirectoryPath = RNFS.CachesDirectoryPath;

export const getStorageSize = async () => {
  const { freeSpace: freeDiskStorage_Byte } = await RNFS.getFSInfo();
  const freeDiskStorage_KB = handleCeilFloorRound(freeDiskStorage_Byte / 1000, 3, 'floor');
  const freeDiskStorage_MB = handleCeilFloorRound(freeDiskStorage_KB / 1000, 3, 'floor');
  const freeDiskStorage_GB = handleCeilFloorRound(freeDiskStorage_MB / 1000, 3, 'floor');
  return {
    freeDiskStorage_KB,
    freeDiskStorage_MB,
    freeDiskStorage_GB,
  };
};

export const getOption = async (name) => {
  let option = await AsyncStorage.getItem(name);
  if (!option) null;

  option = JSON.parse(option);
  return option;
};

export const setOption = (name, option) => {
  AsyncStorage.setItem(name, JSON.stringify(option));
};

export const setStringOption = (name, option) => {
  if (typeof option === 'string' || option instanceof String) {
    AsyncStorage.setItem(name, option);
  }
  if (option === null) {
    AsyncStorage.removeItem(name);
  }
};

export const clearOption = (names) => {
  names.forEach((name) => {
    AsyncStorage.removeItem(name);
  });
};

export const checkNetState = async (ApiUrl = Jinhak_ApiUrl) => {
  let isConnected = false;
  try {
    const networkState = await NetInfo.fetch();
    isConnected = networkState.isConnected;

    if (isConnected) {
      await axios.get(`${ApiUrl}/api/app/func/isconnect`);
    }
  } catch (error) {
    isConnected = false;
    console.log(error);
  }

  return isConnected;
};

export const addNetStateListener = (_this) => {
  // 예시.. componentDidMount에 가져다 달아
  const unsubscribe = NetInfo.addEventListener((state) => {
    console.log('AppContainer connected?', `${state.isConnected}(${state.type})`);
    _this.setState({ isConnected: state.isConnected });
  });
};

export const removeNetStateListener = () => {
  // componentWillUnmount에 달아
  NetInfo.addEventListener((_) => console.log('unsubscribe netInfo in AppCodeContainer. \n'))();
  // NetInfo.addEventListener(_ => _)();
};

export const alertNotConnected = () => {
  return Alert.alert('네트워크 오류', '와이파이 또는 네트워크 연결을 확인해주세요.', [{ text: '확인' }]);
};

export const alertConfirm = ({ title = '', desc = '', okFunc = () => {}, cancelFunc = null }) => {
  if (cancelFunc) {
    return new Promise((resolve) => {
      Alert.alert(title, desc, [
        {
          text: '확인',
          onPress: () => {
            okFunc();
            resolve(true);
          },
        },
        {
          text: '취소',
          onPress: () => {
            cancelFunc();
            resolve(false);
          },
        },
      ]);
    });
  }
  return new Promise((resolve) => {
    Alert.alert(title, desc, [
      {
        text: '확인',
        onPress: () => {
          okFunc();
          resolve(true);
        },
      },
    ]);
  });
};

// log/jinhak 에 로그
export const logError_J = async (logInfo) => {
  try {
    await axios.post(`${Jinhak_ApiUrl}/api/app/func/logErrorJ`, { logInfo });
  } catch (error) {}
};
export const logSuceess_J = async (logInfo) => {
  try {
    await axios.post(`${Jinhak_ApiUrl}/api/app/func/logSuceessJ`, { logInfo });
  } catch (error) {}
};
// log/app 에 로그
export const logError_A = async (logInfo) => {
  try {
    await axios.post(`${Jinhak_ApiUrl}/api/app/func/logErrorA`, { logInfo });
  } catch (error) {}
};

export const logSuceess_A = async (logInfo) => {
  try {
    await axios.post(`${Jinhak_ApiUrl}/api/app/func/logSuceessA`, { logInfo });
  } catch (error) {}
};
