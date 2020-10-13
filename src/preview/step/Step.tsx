import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import { Step as StepType } from '../../types/FormTypes';
import StepDescription from './StepDescription';
import Banner from '../components/Banner/Banner';
import Footer from '../components/Footer/Footer';

const StepContainer = styled.div`
  background: grey;
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
    <StepContainer>
      <Banner backgroundColor={(banner && banner?.backgroundColor) || 'white'} />
      <div>
        <StepDescription heading={title} text={description} tagline={group} />

        <QuestionWrapper>
          <Typography variant="h5">Questions</Typography>
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
  );
};

export default Step;
