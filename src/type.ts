export type PickerImage = {
  fileName: string | null;
  name: string;
  width: number;
  type: string;
  uri: string;
  height: number;
  fileSize: number | null;
  location: {
    latitude?: number;
    longitude?: number;
    altitude?: number;
    heading?: number;
    speed?: number;
  } | null;
};
