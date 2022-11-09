import type { AssetType } from '@react-native-camera-roll/camera-roll';
import type { PickerImage } from './type';
import React, { useCallback, useEffect, useState } from 'react';
import usePermission from './hooks/usePermission';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Header } from './components/Header';
import { ImagePicker } from './components/ImagePicker';
import Modal from 'react-native-modal';

interface Props {
  isVisible: boolean;
  multiple: boolean;
  maximum: number;
  minSelect?: number;
  assetType?: AssetType;
  onClose: (selected: PickerImage[]) => void;
}

export const PKImagePicker: React.FC<Props> = ({
  isVisible,
  onClose,
  minSelect,
  assetType,
  multiple,
}) => {
  const [selected, setSelected] = useState<PickerImage[]>();
  const { getAvailability } = usePermission();
  const handleCompleteSelect = async () => {
    if (!selected?.[0]?.uri) {
      return;
    }
    if (onClose) {
      onClose(selected);
    }
  };

  const handleSetSelected = (e: {
    selected: PickerImage[];
    item: PickerImage;
    index: number;
    isChecked: boolean;
  }) => {
    setSelected(e.selected);
  };

  const getLibraryPermission = useCallback(async () => {
    await getAvailability();
  }, [getAvailability]);

  const handleClose = () => {
    if (onClose) {
      onClose([]);
    }
  };

  useEffect(() => {
    getLibraryPermission().then(() => console.log('checked photos permission'));
  }, [getLibraryPermission]);
  return (
    <Modal
      isVisible={isVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0.8}
      backdropTransitionInTiming={300}
      backdropTransitionOutTiming={300}
      animationInTiming={300}
      animationOutTiming={300}
      useNativeDriver={true}
      onBackdropPress={handleClose}
      onBackButtonPress={handleClose}
      hideModalContentWhileAnimating={true}
      style={styles.modal}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.inner}>
          <Header
            assetType={assetType || 'Photos'}
            selected={selected || []}
            multiple={multiple}
            minSelect={minSelect}
            onCompleteSelect={handleCompleteSelect}
            onClose={handleClose}
          />
          <ImagePicker
            initialNumToRender={50}
            assetType={assetType}
            onChangePhotosEvent={handleSetSelected}
            isMultiSelect={multiple}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalWrapper: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  modal: {
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: 0,
  },
  container: {
    flex: 1,
    width: '100%',
  },
  inner: {
    flex: 1,
    backgroundColor: 'white',
  },
});
