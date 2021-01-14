/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../Button/Button';
import Text from '../Text/Text';
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
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 25px;
  width: 100%;
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

export type ImageStatus = 'loading' | 'uploaded' | 'error';

interface Props {
  buttonText: string;
  value: Image[];
  onChange: (value: Record<string, any>[]) => void;
  colorSchema?: PrimaryColor;
  maxImages?: number;
}

const ImageUploader: React.FC<Props> = ({ buttonText, value: oldImages, onChange, colorSchema, maxImages }) => {
  const [images, setImages] = useState<Image[]>(TEST_IMAGES);

  const validColorSchema = getValidColorSchema(colorSchema);
  return (
    <Wrapper>
      <Container>
        {images.map((image, index) => (
          <ImageItem key={`${image.path}-${index}`} filename={image.path as string} />
        ))}
      </Container>
      <ButtonContainer>
        <Button colorSchema={validColorSchema}>
          <Text> {buttonText && buttonText !== '' ? buttonText : 'Ladda upp bild'}</Text>
        </Button>
      </ButtonContainer>
    </Wrapper>
  );
};

export default ImageUploader;
