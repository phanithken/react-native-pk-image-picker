import React, { useEffect, useMemo, useState } from 'react';
import type {
  AssetType,
  GroupTypes,
} from '@react-native-camera-roll/camera-roll';
import { Dimensions, FlatList, View } from 'react-native';
import type { PickerImage } from '../type';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Photo } from '../utils/Photo';
import { ImageItem } from './ImageItem';
import Toast from 'react-native-toast-message';

interface Props {
  initialNumToRender?: number;
  groupTypes?: GroupTypes;
  assetType?: AssetType;
  maximum?: number;
  imagePerRow?: number;
  imageMargin?: number;
  containerWidth?: number;
  backgroundColor?: string;
  isMultiSelect?: boolean;
  maxSize?: number;
  maxSizeErrorText?: string;
  onChangePhotosEvent?: (e: {
    selected: PickerImage[];
    item: PickerImage;
    index: number;
    isChecked: boolean;
  }) => void;
  onMaxSelectEvent?: () => void;
}

const { width } = Dimensions.get('screen');
export const ImagePicker: React.FC<Props> = ({
  initialNumToRender = 50,
  groupTypes = 'All',
  assetType = 'Photos',
  maximum = 15,
  imagePerRow = 3,
  imageMargin = 1,
  containerWidth = width,
  backgroundColor = 'white',
  onChangePhotosEvent,
  onMaxSelectEvent,
  isMultiSelect = false,
  maxSize = 10,
  maxSizeErrorText,
}) => {
  const insets = useSafeAreaInsets();
  const PHOTO_LENGTH = initialNumToRender;
  const MAX_SELECT_PHOTO_LENGTH = maximum;
  const IMAGE_SIZE =
    containerWidth / imagePerRow - (imageMargin - imageMargin / imagePerRow);
  const [photos, setPhotos] = useState<PickerImage[]>([]);
  const photoInstance = useMemo(
    () => new Photo(PHOTO_LENGTH, assetType, groupTypes),
    [PHOTO_LENGTH, assetType, groupTypes]
  );
  const [selected, setSelected] = useState<PickerImage[]>([]);

  useEffect(() => {
    photoInstance.onPhoto((images) => {
      setPhotos(images);
    });
  }, [photoInstance]);

  const handleSelect = (
    item: PickerImage,
    order: number,
    isChecked: boolean
  ) => {
    const size = item.fileSize;
    if (size && maxSize !== -1 && item.type !== 'video/mp4') {
      const mb = size / 1000 / 1000;
      if (mb > maxSize) {
        Toast.show({
          type: 'error',
          text1: maxSizeErrorText
            ? maxSizeErrorText
            : 'Unable to choose the image due to size limit',
        });
        return;
      }
    }

    if (isMultiSelect) {
      const copiedPhotos: PickerImage[] = selected.slice();
      if (order === -1) {
        if (selected.length === MAX_SELECT_PHOTO_LENGTH) {
          onMaxSelectEvent && onMaxSelectEvent();
        } else {
          copiedPhotos.push(item);
        }
      } else {
        copiedPhotos.splice(order, 1);
      }
      setSelected(copiedPhotos);
      onChangePhotosEvent &&
        onChangePhotosEvent({
          selected: copiedPhotos,
          item: item,
          index: order,
          isChecked: isChecked,
        });
      return;
    }
    setSelected([item]);
    onChangePhotosEvent &&
      onChangePhotosEvent({
        selected: [item],
        item: item,
        index: order,
        isChecked: isChecked,
      });
  };

  const _renderItem = ({
    item,
    index,
  }: {
    item: PickerImage;
    index: number;
  }) => {
    const isMarginRight = (index + 1) % imagePerRow !== 0;
    const selectedIndex = selected.findIndex((photo) => photo.uri === item.uri);
    let isChecked = false;
    if (selectedIndex !== -1) {
      isChecked = true;
    }
    return (
      <ImageItem
        handleSelect={handleSelect}
        item={item}
        isChecked={isChecked}
        selectedIndex={selectedIndex}
        isMultiSelect={isMultiSelect}
        isMaxSelected={selected.length === MAX_SELECT_PHOTO_LENGTH}
        styles={{
          width: IMAGE_SIZE,
          height: IMAGE_SIZE,
          marginRight: isMarginRight ? imageMargin : 0,
          marginBottom: imageMargin,
        }}
      />
    );
  };
  const _ketExtractor = (item: PickerImage) => item.uri;
  const handleEndReach = () => photoInstance.loadNext();

  return (
    <View style={{ backgroundColor }}>
      <FlatList
        contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
        data={photos}
        renderItem={_renderItem}
        keyExtractor={_ketExtractor}
        numColumns={imagePerRow}
        onEndReached={handleEndReach}
        onEndReachedThreshold={0.8}
      />
    </View>
  );
};
