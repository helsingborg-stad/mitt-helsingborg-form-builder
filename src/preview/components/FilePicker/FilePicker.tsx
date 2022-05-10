import React from 'react';

import Button from '../Button/Button';
import Text from '../Text/Text';
import PdfDisplay from '../PdfDisplay/PdfDisplay';

import { getValidColorSchema, PrimaryColor } from '../../styles/themeHelpers';

import { Wrapper, ButtonContainer } from './FilePicker.styled';

interface Props {
  buttonText?: string;
  colorSchema?: PrimaryColor;
}

const FilePicker: React.FC<Props> = ({ buttonText = '', colorSchema }) => {
  const validColorSchema = getValidColorSchema(colorSchema);
  return (
    <Wrapper>
      <PdfDisplay colorSchema={validColorSchema} />
      <ButtonContainer>
        <Button colorSchema={validColorSchema}>
          <Text> {buttonText || 'Ladda upp fil'}</Text>
        </Button>
      </ButtonContainer>
    </Wrapper>
  );
};

export default FilePicker;
