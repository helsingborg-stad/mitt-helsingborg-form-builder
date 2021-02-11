import React from 'react';
import styled from 'styled-components';
import { getValidColorSchema, PrimaryColor } from '../../styles/themeHelpers';

import ImageDisplay from '../ImageDisplay/ImageDisplay';

const Wrapper = styled.div`
  padding-left: 0;
  padding-right: 0;
  padding-top: 15px;
  padding-bottom: 0;
`;

interface Props {
  colorSchema?: PrimaryColor;
}

const ImageViewer: React.FC<Props> = ({ colorSchema }) => {
  const validColorSchema = getValidColorSchema(colorSchema);
  return (
    <Wrapper>
      <ImageDisplay colorSchema={validColorSchema} />
    </Wrapper>
  );
};

export default ImageViewer;
