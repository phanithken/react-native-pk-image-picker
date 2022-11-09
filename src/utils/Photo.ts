import type {
  AssetType,
  GetPhotosParams,
  GroupTypes,
  PhotoIdentifiersPage,
} from '@react-native-camera-roll/camera-roll';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import type { PickerImage } from '../type';
import { v4 as uuidv4 } from 'uuid';
import { EventListener } from './EventListener';

export class Photo {
  private options: GetPhotosParams = {
    first: 50, // default initial photo load
    include: ['location', 'fileSize'],
  };
  private galleryInfo: PhotoIdentifiersPage['page_info'] = {
    end_cursor: '',
    has_next_page: false,
  };
  constructor(length: number, assetType: AssetType, groupTypes: GroupTypes) {
    this.options.first = length;
    this.options.assetType = assetType;
    this.options.groupTypes = groupTypes;
  }

  onPhoto = (callback: (photos: PickerImage[]) => void) => {
    return EventListener.addEventListener('photos', callback);
  };

  load = async (isDuplicateBug = false): Promise<void> => {
    const newPhotoData: PhotoIdentifiersPage = await CameraRoll.getPhotos({
      ...this.options,
      first: isDuplicateBug ? 5000 : this.options.first,
    });
    const newPhotos = this.bundlePhotos(newPhotoData);
    if (newPhotos.length === 0) {
      console.warn('image length 0');
      return;
    }
    EventListener.emitEvent('photos', newPhotos);
  };

  public setAssetType(assetType: AssetType) {
    this.options.assetType = assetType;
  }

  public setGroupTypes(groupTypes: GroupTypes) {
    this.options.groupTypes = groupTypes;
  }

  private bundlePhotos = (
    newPhotoData: PhotoIdentifiersPage
  ): PickerImage[] => {
    let newPhotos: PickerImage[] = [];
    for (let i = 0; i < newPhotoData.edges.length; i++) {
      const edge = newPhotoData.edges[i];
      if (edge) {
        const nameId = uuidv4();
        newPhotos.push({
          name: edge.node.type.includes('images')
            ? `${nameId}.jpg`
            : `${nameId}.mp4`,
          type: edge.node.type.includes('image') ? 'image/jpeg' : 'video/mp4',
          uri: edge.node.image.uri,
          fileName: edge.node.image.filename,
          width: edge.node.image.width,
          height: edge.node.image.height,
          fileSize: edge.node.image.fileSize,
          location: edge.node.location,
        });
      }
    }
    return newPhotos;
  };

  loadNext = async (): Promise<void> => {
    if (!this.galleryInfo.has_next_page || !this.galleryInfo.end_cursor) {
      return;
    }
    const photos = await CameraRoll.getPhotos({
      after: this.galleryInfo.end_cursor,
      ...this.options,
    });
    const photoBundle = this.bundlePhotos(photos);
    const isDuplicate = this.bypassDuplicate(photoBundle);
    if (isDuplicate) {
      return;
    }
    EventListener.emitEvent('photos', photoBundle);
    this.galleryInfo = photos.page_info;
  };

  bypassDuplicate = (photos: PickerImage[]) => {
    if (photos.length === 0) {
      return false;
    }
    const uris = photos.map((item) => item.uri);
    // @ts-ignore
    return uris.includes(photos[0].uri);
  };
}
