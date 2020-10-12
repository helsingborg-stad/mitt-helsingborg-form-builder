import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

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
  stepNumber?: number;
  totalStepNumber?: number;
  imageSrc?: string;
  iconSrc?: string;
  backgroundColor: string;
  style?: React.CSSProperties;
}

const Banner: React.FC<Props> = ({ stepNumber, totalStepNumber, backgroundColor, style = {} }) => {
  style.backgroundColor = backgroundColor = backgroundColor && backgroundColor !== '' ? backgroundColor : 'white';

  return (
    <BannerWrapper style={style}>
      {/* {Object.prototype.hasOwnProperty.call(icons, imageSrc) ? (
      <BannerImageWrapper>
        <BannerImage resizeMode="contain" source={icons[imageSrc]} />
      </BannerImageWrapper>
    ) : null} */}

      {/* {Object.prototype.hasOwnProperty.call(icons, iconSrc) ? (
      <BannerImageIcon source={icons[iconSrc]} />
    ) : null} */}
      {/* {totalStepNumber > 1 && (
        <ProgressCounterText>
          Steg {stepNumber}/{totalStepNumber}
        </ProgressCounterText>
      )} */}
    </BannerWrapper>
  );
};

export default Banner;
