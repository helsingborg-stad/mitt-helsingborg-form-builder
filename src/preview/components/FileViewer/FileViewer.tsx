import React from 'react';
import FileDisplay from '../FileDisplay/FileDisplay';

import Wrapper from './FileViewer.styled';

const FileViewer = (): JSX.Element => {
  return (
    <Wrapper>
      <FileDisplay />
    </Wrapper>
  );
};

export default FileViewer;
