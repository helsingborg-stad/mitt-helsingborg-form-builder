import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { ThemeProvider as MaterialThemeProvider, createMuiTheme } from '@material-ui/core';
import { Step as StepType } from '../../types/FormTypes';
import StepDescription from './StepDescription';
import Banner from '../components/Banner/Banner';
import Footer from '../components/Footer/Footer';
import theme from '../styles/theme';
import FormField from '../components/FormField/FormField';
import { getValidColorSchema } from '../styles/themeHelpers';

const StepContainer = styled.div`
  background: ${(props) => props.theme.colors.neutrals[7]};
  display: inline-flex;
  flex-direction: column;
  justify-content: flex-start;
  flex: 1;
  width: 400px;
  padding-bottom: 0px;
  position: relative;
`;

const QuestionWrapper = styled.div`
  margin-left: 25px;
  margin-bottom: 60px;
`;

interface Props {
  stepData: StepType;
}
const Step: React.FC<Props> = ({ stepData }) => {
  const { questions, actions, title, description, group } = stepData;

  const localMaterialTheme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: 'light',
        },
      }),
    [],
  );

  const validColorSchema = getValidColorSchema(stepData.colorSchema);
  return (
    <MaterialThemeProvider theme={localMaterialTheme}>
      <ThemeProvider theme={theme}>
        <StepContainer>
          <Banner colorSchema={validColorSchema} />
          <div>
            <StepDescription colorSchema={validColorSchema} heading={title} text={description} tagline={group} />

            <QuestionWrapper>
              {questions?.map((q) => (
                <FormField key={q.id} labelLine={true} inputType={q.type} colorSchema={validColorSchema} {...q} />
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
