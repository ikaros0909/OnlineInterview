import * as React from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import ScreenOrientation from 'react-native-orientation-locker';
import CodePush from 'react-native-code-push';
import RNBootSplash from 'react-native-bootsplash';

import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Foundation from 'react-native-vector-icons/Foundation';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  const lockOrientation = async () => {
    await ScreenOrientation.lockToLandscape();
  };

  const pushCode = async () => {
    await CodePush.sync({
      updateDialog: {
        title: '새로운 업데이트가 존재합니다.',
        optionalUpdateMessage: '업데이트 하지 않고 사용할 경우 정상 작동하지 않습니다. \n원활한 사용을 위해 꼭 업데이트 해주세요. \n소요시간: 1초',
        optionalInstallButtonLabel: '업데이트',
        optionalIgnoreButtonLabel: '무시하기',
      },
      installMode: CodePush.InstallMode.IMMEDIATE,
    });
  };

  const loadFont = async () => {
    await Promise.all([
      AntDesign.loadFont(),
      MaterialCommunityIcons.loadFont(),
      Feather.loadFont(),
      FontAwesome.loadFont(),
      SimpleLineIcons.loadFont(),
      Foundation.loadFont(),
    ]);
  };

  const requestPermission = async () => {
    const { CAMERA, RECORD_AUDIO, READ_EXTERNAL_STORAGE, WRITE_EXTERNAL_STORAGE } = PermissionsAndroid.PERMISSIONS;
    let hasPermission = await PermissionsAndroid.check(CAMERA);
    if (!hasPermission) {
      await PermissionsAndroid.request(CAMERA);
    }

    hasPermission = await PermissionsAndroid.check(RECORD_AUDIO);
    if (!hasPermission) {
      await PermissionsAndroid.request(RECORD_AUDIO);
    }

    hasPermission = await PermissionsAndroid.check(WRITE_EXTERNAL_STORAGE);
    if (!hasPermission) {
      await PermissionsAndroid.request(WRITE_EXTERNAL_STORAGE);
    }

    hasPermission = await PermissionsAndroid.check(READ_EXTERNAL_STORAGE);
    if (!hasPermission) {
      await PermissionsAndroid.request(READ_EXTERNAL_STORAGE);
    }
  };

  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        await Promise.all([lockOrientation(), requestPermission(), loadFont()]);
        // AAA
        await pushCode();
      } catch (e) {
        console.log('Whilie AppLoading error:', e);
      } finally {
        setLoadingComplete(true);
        RNBootSplash.hide({ duration: 250 });
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
