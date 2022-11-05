import {
  requireNativeComponent,
  UIManager,
  Platform,
  ViewStyle,
} from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-pk-image-picker' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

type PkImagePickerProps = {
  color: string;
  style: ViewStyle;
};

const ComponentName = 'PkImagePickerView';

export const PkImagePickerView =
  UIManager.getViewManagerConfig(ComponentName) != null
    ? requireNativeComponent<PkImagePickerProps>(ComponentName)
    : () => {
        throw new Error(LINKING_ERROR);
      };
