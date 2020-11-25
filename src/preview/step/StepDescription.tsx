import React from 'react';
import styled from 'styled-components';
import Text from '../components/Text/Text';
import Heading from '../components/Heading/Heading';

const StepDescriptionWrapper = styled.div`
  margin-left: 25px;
  margin-top: 76px;
  margin-bottom: 48px;
`;

const StepDescriptionHeading = styled(Heading)`
  line-height: 40px;
`;

const StepDescriptionTagline = styled(Text)<{ type: string; colorSchema: string }>`
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
  style?: React.CSSProperties;
  theme?: Record<string, any>;
  tagline?: string;
  heading?: string;
  text?: string;
}

const StepDescription: React.FC<Props> = ({ style, theme, tagline, heading, text }) => {
  return (
    <StepDescriptionWrapper>
      {tagline && tagline?.length > 0 && (
        <StepDescriptionTagline type="text" colorSchema="blue">
          {tagline}
        </StepDescriptionTagline>
      )}
      <StepDescriptionHeading>{heading}</StepDescriptionHeading>
      {text && <StepDescriptionText type="text">{text}</StepDescriptionText>}
    </StepDescriptionWrapper>
  );
};

export default StepDescription;
