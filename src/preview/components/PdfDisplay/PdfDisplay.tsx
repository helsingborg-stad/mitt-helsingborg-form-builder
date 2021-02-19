/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import styled from 'styled-components';
import { PrimaryColor } from '../../styles/themeHelpers';
import PdfItem from './PdfItem';

import bankStatement from '../../assets/images/pictures/BankStatement.png';
import form from '../../assets/images/pictures/form.png';

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

interface Pdf {
  path: string;
  errorMessage?: string;
  uploadedFileName?: string;
  url?: string;
}

const PDF_IMAGES: Pdf[] = [
  {
    path: bankStatement,
  },
  {
    path: form,
  },
];

interface Props {
  colorSchema?: PrimaryColor;
}

const PdfDisplay: React.FC<Props> = ({ colorSchema }) => {
  const [pdfs, setPdfs] = useState<Pdf[]>(PDF_IMAGES);

  return (
    <Wrapper>
      <Container>
        {pdfs.map((image, index) => (
          <PdfItem key={`${image.path}-${index}`} filename={image.path as string} />
        ))}
      </Container>
    </Wrapper>
  );
};

export default PdfDisplay;
