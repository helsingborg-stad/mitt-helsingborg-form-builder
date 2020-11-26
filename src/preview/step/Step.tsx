import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { ThemeProvider as MaterialThemeProvider, createMuiTheme } from '@material-ui/core';
import { Step as StepType } from '../../types/FormTypes';
import StepDescription from './StepDescription';
import Banner from '../components/Banner/Banner';
import Footer from '../components/Footer/Footer';
import theme from '../styles/theme';
import FormField from '../components/FormField/FormField';

const StepContainer = styled.div`
  background: ${(props) => props.theme.colors.neutrals[7]};
  flex: 1;
  width: 400px;
  min-height: 800px;
  position: relative;
`;

const QuestionWrapper = styled.div`
  margin-left: 25px;
  padding-bottom: 150px;
`;

interface Props {
  stepData: StepType;
}
const Step: React.FC<Props> = ({ stepData }) => {
  const { questions, actions, title, description, group, banner } = stepData;

  const localMaterialTheme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: 'light',
        },
      }),
    [],
  );

  return (
    <MaterialThemeProvider theme={localMaterialTheme}>
      <ThemeProvider theme={theme}>
        <StepContainer>
          <Banner colorSchema="blue" />
          <div>
            <StepDescription heading={title} text={description} tagline={group} />

            <QuestionWrapper>
              {questions?.map((q) => (
                <FormField key={q.id} labelLine={true} inputType={q.type} color={'blue'} {...q} />
              ))}
            </QuestionWrapper>
          </div>
          <Footer actions={actions || []} />
        </StepContainer>
      </ThemeProvider>
    </MaterialThemeProvider>
  );
};

export default Step;
