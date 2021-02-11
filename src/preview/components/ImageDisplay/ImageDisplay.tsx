/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import styled from 'styled-components';
import { getValidColorSchema, PrimaryColor } from '../../styles/themeHelpers';
import ImageItem from './ImageItem';

import monaLisa from '../../assets/images/pictures/mona-lisa.jpg';
import girlWithPearlEarring from '../../assets/images/pictures/Meisje_met_de_parel.jpg';

const Wrapper = styled.div`
  padding-left: 0;
  padding-right: 0;
  padding-top: 15px;
  padding-bottom: 0;
`;
const Container = styled.div`
  padding-left: 16px;
  padding-right: 16px;
  display: inline-flex;
  flex-direction: row;
`;

interface Image {
  path: string;
  errorMessage?: string;
  uploadedFileName?: string;
  url?: string;
}

const TEST_IMAGES: Image[] = [
  {
    path: monaLisa,
  },
  {
    path: girlWithPearlEarring,
  },
];

interface Props {
  colorSchema?: PrimaryColor;
}

const ImageDisplay: React.FC<Props> = ({ colorSchema }) => {
  const [images, setImages] = useState<Image[]>(TEST_IMAGES);

  return (
    <Wrapper>
      <Container>
        {images.map((image, index) => (
          <ImageItem key={`${image.path}-${index}`} filename={image.path as string} />
        ))}
      </Container>
    </Wrapper>
  );
};

export default ImageDisplay;
