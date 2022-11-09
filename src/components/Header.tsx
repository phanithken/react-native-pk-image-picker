import type { AssetType } from '@react-native-camera-roll/camera-roll';
import type { PickerImage } from '../type';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
  assetType: AssetType;
  minSelect?: number;
  selected: PickerImage[];
  multiple: boolean;
  onCompleteSelect: () => void;
  closeText?: string;
  selectText?: string;
  onClose: () => void;
}

export const Header: React.FC<Props> = ({
  onCompleteSelect,
  minSelect = 1,
  selected = [],
  assetType,
  multiple,
  closeText,
  selectText,
  onClose,
}) => {
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.inner}>
          <TouchableOpacity style={styles.actionBtn} onPress={handleClose}>
            <View style={styles.currentAlbum}>
              <Text style={styles.currentAlbumTitle}>
                {closeText ? closeText : 'Close'}
              </Text>
            </View>
            {assetType && (
              <Text style={styles.assetType}>
                {/*TODO: get text from localization*/}
                {assetType === 'Photos' ? 'Photos' : 'Videos'}
              </Text>
            )}
            <TouchableOpacity
              style={{
                ...styles.actionBtn,
                ...{
                  opacity: multiple && selected.length < minSelect ? 0.3 : 1,
                },
              }}
              disabled={multiple && selected.length < minSelect}
              onPress={onCompleteSelect}
            >
              <Text style={styles.updateBtn}>
                {selectText ? selectText : 'Select'}
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionBtn: {
    paddingVertical: 17,
    paddingHorizontal: 20,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  assetType: {
    fontWeight: '700',
    fontSize: 18,
    color: 'black',
    paddingVertical: 17,
  },
  currentAlbum: {
    flexDirection: 'row',
  },
  currentAlbumTitle: {
    fontWeight: '700',
    fontSize: 15,
    color: 'black',
  },
  updateBtn: {
    fontWeight: '700',
    fontSize: 15,
    color: 'black',
  },
});
