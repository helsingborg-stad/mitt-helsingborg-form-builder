import React from 'react';
import FileItem from '../FileItem/FileItem';

import bankStatement from '../../assets/images/pictures/BankStatement.png';
import form from '../../assets/images/pictures/form.png';

import { Wrapper, Container } from './FileDisplay.styled';

interface File {
  path: string;
  errorMessage?: string;
  uploadedFileName?: string;
  url?: string;
}

const PREVIEW_IMAGES: File[] = [
  {
    path: bankStatement,
  },
  {
    path: form,
  },
];

const FileDisplay = (): JSX.Element => {
  return (
    <Wrapper>
      <Container>
        {PREVIEW_IMAGES.map((image, index) => (
          <FileItem key={`${image.path}-${index}`} filename={image.path} />
        ))}
      </Container>
    </Wrapper>
  );
};

export default FileDisplay;
