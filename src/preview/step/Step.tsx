import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Typography } from '@material-ui/core';
import { Step as StepType } from '../../types/FormTypes';
import StepDescription from './StepDescription';
import Banner from '../components/Banner/Banner';
import Footer from '../components/Footer/Footer';
import theme from '../styles/theme';
import Text from '../components/Text/Text';

const StepContainer = styled.div`
  background: ${(props) => props.theme.colors.neutrals[7]};
  flex: 1;
  width: 400px;
  min-height: 800px;
  position: relative;
`;

const QuestionWrapper = styled.div`
  margin-left: 25px;
  margin-top: 76px;
  margin-bottom: 48px;
`;

interface Props {
  stepData: StepType;
}
const Step: React.FC<Props> = ({ stepData }) => {
  const { questions, actions, title, description, group, banner } = stepData;
  return (
    <ThemeProvider theme={theme}>
      <StepContainer>
        <Banner colorSchema="blue" />
        <div>
          <StepDescription heading={title} text={description} tagline={group} />

          <QuestionWrapper>
            <Text type="h2">Questions</Text>
            <ul>
              {questions?.map((q) => (
                <li key={q.id}>
                  {q.label || q.description}, {q.type}
                </li>
              ))}
            </ul>
          </QuestionWrapper>
        </div>
        <Footer actions={actions || []} />
      </StepContainer>
    </ThemeProvider>
  );
};

export default Step;
