import React from 'react';
import styled from 'styled-components';

const BannerWrapper = styled.div<{ colorSchema: 'blue' | 'red' | 'green' | 'purple' }>`
  margin: 0;
  padding: 0;
  min-height: 256px;
  position: relative;
  justify-content: flex-end;
  background-color: ${(props) => props.theme.colors.complementary[props.colorSchema][0]};
`;

interface Props {
  colorSchema?: string;
  imageSrc?: string;
  iconSrc?: string;
  backgroundColor?: string;
  style?: React.CSSProperties;
}

const Banner: React.FC<Props> = ({ backgroundColor, style = {}, colorSchema = 'blue' }) => {
  const validColorSchema: 'blue' | 'red' | 'green' | 'purple' = ['blue', 'red', 'green', 'purple'].includes(colorSchema)
    ? (colorSchema as 'blue' | 'red' | 'green' | 'purple')
    : 'blue';
  return <BannerWrapper colorSchema={validColorSchema}></BannerWrapper>;
};

export default Banner;
