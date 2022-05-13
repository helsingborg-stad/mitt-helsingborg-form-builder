export enum FileType {
  PDF = 'pdf',
  IMAGES = 'images',
  ALL = 'all',
}

export const fileTypes = [
  {
    value: FileType.ALL,
    name: 'All file types',
  },
  {
    value: FileType.PDF,
    name: 'Only Pdf',
  },
  {
    value: FileType.IMAGES,
    name: 'Only images',
  },
];
