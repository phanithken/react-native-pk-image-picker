import { Platform, Alert } from 'react-native';
import {
  check,
  PERMISSIONS,
  RESULTS,
  request,
  openSettings,
  checkMultiple,
  requestMultiple,
} from 'react-native-permissions';

export default function usePermission() {
  const getAvailability = async (
    permissionTitle?: string,
    permissionMessage?: string
  ) => {
    const { UNAVAILABLE, BLOCKED, DENIED } = RESULTS;

    if (Platform.OS === 'ios') {
      const permission = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);

      if (permission === UNAVAILABLE) {
        return false;
      }
      if (permission === BLOCKED) {
        Alert.alert(
          permissionTitle ? permissionTitle : 'Attention',
          permissionMessage
            ? permissionMessage
            : 'Do you want to allow access to the photos?',
          [
            {
              text: 'cancel',
              style: 'cancel',
            },
            {
              text: 'confirm',
              onPress: openSettings,
            },
          ]
        );
        return false;
      }
      if (permission === DENIED) {
        const requestPermission = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
        if (requestPermission === BLOCKED) {
          return false;
        }
      }
    }

    if (Platform.OS === 'android') {
      const needPermissions = [
        PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        PERMISSIONS.ANDROID.ACCESS_MEDIA_LOCATION,
      ];
      const permission = await checkMultiple(needPermissions);
      const status = needPermissions.map((v) => permission[v]);
      if (status.includes(UNAVAILABLE)) {
        return false;
      }
      if (status.includes(BLOCKED)) {
        Alert.alert(
          permissionTitle ? permissionTitle : 'Attention',
          permissionMessage
            ? permissionMessage
            : 'Do you want to allow access to the photos?',
          [
            {
              text: 'cancel',
              style: 'cancel',
            },
            {
              text: 'confirm',
              onPress: openSettings,
            },
          ]
        );
        return false;
      }
      if (status.includes(DENIED)) {
        const requestPermission = await requestMultiple(needPermissions);
        const reqStatus = needPermissions.map((v) => requestPermission[v]);
        if (reqStatus.includes(BLOCKED) || reqStatus.includes(DENIED)) {
          return false;
        }
      }
    }

    return true;
  };

  return {
    getAvailability,
  };
}
