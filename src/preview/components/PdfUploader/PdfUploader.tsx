import React from 'react';
import styled from 'styled-components';
import Button from '../Button/Button';
import Text from '../Text/Text';
import { getValidColorSchema, PrimaryColor } from '../../styles/themeHelpers';
import PdfDisplay from '../PdfDisplay/PdfDisplay';

const Wrapper = styled.div`
  padding-left: 0;
  padding-right: 0;
  padding-top: 15px;
  padding-bottom: 0;
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

interface Props {
  buttonText: string;
  colorSchema?: PrimaryColor;
}

const PdfUploader: React.FC<Props> = ({ buttonText, colorSchema }) => {
  const validColorSchema = getValidColorSchema(colorSchema);
  return (
    <Wrapper>
      <PdfDisplay colorSchema={validColorSchema} />
      <ButtonContainer>
        <Button colorSchema={validColorSchema}>
          <Text> {buttonText && buttonText !== '' ? buttonText : 'Ladda upp bild'}</Text>
        </Button>
      </ButtonContainer>
    </Wrapper>
  );
};

export default PdfUploader;
