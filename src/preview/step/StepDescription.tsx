import React from 'react';
import styled from 'styled-components';
import Text from '../components/Text/Text';
import Heading from '../components/Heading/Heading';
import { PrimaryColor } from '../styles/themeHelpers';

const StepDescriptionWrapper = styled.div`
  margin-left: 25px;
  margin-top: 76px;
  margin-bottom: 48px;
`;

const StepDescriptionHeading = styled(Heading)`
  line-height: 40px;
`;

const StepDescriptionTagline = styled(Text)<{ type: string; colorSchema: PrimaryColor }>`
  font-size: ${(props) => props.theme.typography[props.type].fontSize}px;
  font-weight: bold;
  margin-bottom: 10px;
  color: ${(props) => props.theme.colors.primary[props.colorSchema][1]};
  line-height: ${(props) => props.theme.typography[props.type].lineHeight}px;
  letter-spacing: 0.5px;
`;

const StepDescriptionText = styled(Text)<{ type: string }>`
  line-height: ${(props) => props.theme.typography[props.type].lineHeight}px;
  margin-top: 16px;
`;
interface Props {
  tagline?: string;
  heading?: string;
  text?: string;
  colorSchema: PrimaryColor;
}

const StepDescription: React.FC<Props> = ({ colorSchema, tagline, heading, text }) => {
  return (
    <StepDescriptionWrapper>
      {tagline && tagline?.length > 0 && (
        <StepDescriptionTagline type="text" colorSchema={colorSchema}>
          {tagline}
        </StepDescriptionTagline>
      )}
      <StepDescriptionHeading>{heading}</StepDescriptionHeading>
      {text && <StepDescriptionText type="text">{text}</StepDescriptionText>}
    </StepDescriptionWrapper>
  );
};

export default StepDescription;
