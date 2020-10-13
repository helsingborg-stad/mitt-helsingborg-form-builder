import React from 'react';
import styled from 'styled-components';

const BannerWrapper = styled.div`
  margin: 0;
  padding: 0;
  min-height: 256px;
  position: relative;
  justify-content: flex-end;
`;

interface Props {
  stepNumber?: number;
  totalStepNumber?: number;
  imageSrc?: string;
  iconSrc?: string;
  backgroundColor: string;
  style?: React.CSSProperties;
}

const Banner: React.FC<Props> = ({ stepNumber, totalStepNumber, backgroundColor, style = {} }) => {
  style.backgroundColor = backgroundColor = backgroundColor && backgroundColor !== '' ? backgroundColor : 'white';

  return <BannerWrapper style={style}></BannerWrapper>;
};

export default Banner;
