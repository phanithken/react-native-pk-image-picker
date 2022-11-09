import React, { ReactElement, useCallback } from 'react';
import type { PickerImage } from '../type';
import FastImage from 'react-native-fast-image';
import {
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

interface Props {
  handleSelect: (item: PickerImage, order: number, isChecked: boolean) => void;
  item: PickerImage;
  isChecked: boolean;
  selectedIndex: number;
  isMultiSelect?: boolean;
  isMaxSelected?: boolean;
  styles?: {};
  renderCheckMark?: () => ReactElement;
}

export const ImageItem: React.FC<Props> = ({
  handleSelect,
  item,
  isChecked,
  selectedIndex,
  isMaxSelected,
  styles,
  renderCheckMark,
}) => {
  let checkmark;
  if (renderCheckMark) {
    checkmark = renderCheckMark();
  }
  const onPress = useCallback(() => {
    if (handleSelect) {
      handleSelect(item, selectedIndex, isChecked);
    }
  }, [handleSelect, isChecked, item, selectedIndex]);
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={theStyles.container}
      onPress={onPress}
    >
      {Platform.OS === 'android' ? (
        <FastImage style={styles} source={{ uri: item.uri }} />
      ) : (
        <Image style={styles} source={{ uri: item.uri }} />
      )}
      {isChecked && (
        <View style={theStyles.selectCircle}>
          {checkmark ? (
            <View style={theStyles.checkMark}>{checkmark}</View>
          ) : (
            <Image
              style={theStyles.checkMark}
              source={require('./assets/check-mark.png')}
            />
          )}
          {!isChecked && isMaxSelected && <View style={theStyles.overlay} />}
        </View>
      )}
    </TouchableOpacity>
  );
};

const theStyles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  overlay: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    opacity: 0.5,
    position: 'absolute',
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkMark: {
    width: 25,
    height: 25,
  },
  selectCircle: {
    width: 25,
    height: 25,
    borderRadius: 15,
    position: 'absolute',
    top: 5,
    left: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counter: { color: '#2D3239', fontWeight: '700' },
});
