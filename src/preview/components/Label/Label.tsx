import React from 'react';
import styled from 'styled-components';

const BannerWrapper = styled.div`
  margin: 0;
  padding: 0;
  min-height: 256px;
  position: relative;
  justify-content: flex-end;
`;
// background: ${(props) => props.backgroundColor};

// const BannerImageIcon = styled(Image)`
//   width: 72px;
//   position: absolute;
//   bottom: -37px;
//   left: 32px;
// `;

const ProgressCounterText = styled.p`
  position: absolute;
  bottom: -37px;
  right: 32px;
`;

const BannerImageWrapper = styled.div`
  height: 256px;
`;
const BannerImage = styled.image`
  width: 100%;
  height: 100%;
`;
interface Props {
  text: string;
}

const Label: React.FC<Props> = ({ text }) => {
  return <BannerWrapper>{text}</BannerWrapper>;
};

export default Label;
