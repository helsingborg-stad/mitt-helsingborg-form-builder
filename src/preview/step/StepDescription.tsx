import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';

const StepDescriptionWrapper = styled.div`
  margin-left: 25px;
  margin-top: 76px;
  margin-bottom: 48px;
`;

const StepDescriptionHeading = styled.h1`
  font-size: 30px;
  line-height: 40px;
`;

const StepDescriptionTagline = styled.p`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 16px;
  line-height: 20px;
  letter-spacing: 0.5px;
`;

const StepDescriptionText = styled.p`
  font-size: 16px;
  margin-top: 16px;
  line-height: 25px;
`;

interface Props {
  style?: React.CSSProperties;
  theme?: Record<string, any>;
  tagline?: string;
  heading?: string;
  text?: string;
}

const StepDescription: React.FC<Props> = ({ style, theme, tagline, heading, text }) => {
  return (
    <StepDescriptionWrapper style={style}>
      {tagline && tagline?.length > 0 && <StepDescriptionTagline>{tagline}</StepDescriptionTagline>}
      <StepDescriptionHeading>{heading}</StepDescriptionHeading>
      {text && <StepDescriptionText>{text}</StepDescriptionText>}
    </StepDescriptionWrapper>
  );
};

export default StepDescription;
