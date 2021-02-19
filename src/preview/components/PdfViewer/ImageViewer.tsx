import React from 'react';
import styled from 'styled-components';
import { getValidColorSchema, PrimaryColor } from '../../styles/themeHelpers';
import PdfDisplay from '../PdfDisplay/PdfDisplay';

const Wrapper = styled.div`
  padding-left: 0;
  padding-right: 0;
  padding-top: 15px;
  padding-bottom: 0;
`;

interface Props {
  colorSchema?: PrimaryColor;
}

const PdfViewer: React.FC<Props> = ({ colorSchema }) => {
  const validColorSchema = getValidColorSchema(colorSchema);
  return (
    <Wrapper>
      <PdfDisplay colorSchema={validColorSchema} />
    </Wrapper>
  );
};

export default PdfViewer;
