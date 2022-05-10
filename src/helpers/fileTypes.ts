export enum FileType {
  PDF = 'pdf',
  IMAGES = 'images',
  ALL = 'all',
}

export const fileTypes = [
  {
    value: 'all',
    name: 'All file types',
  },
  {
    value: 'pdf',
    name: 'Only Pdf',
  },
  {
    value: 'images',
    name: 'Only images',
  },
];
