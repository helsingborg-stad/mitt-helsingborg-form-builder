import React, { useEffect, useState } from 'react';
import CSS from 'csstype';
import { Select, MenuItem, Checkbox, FormGroup, FormControlLabel } from '@material-ui/core';
import { useFormikContext } from 'formik';
import { getPropertyFromDottedString } from '../../../helpers/object';
import { Form, StepperActions } from '../../../types/FormTypes';

const inputFieldStyle: CSS.Properties = {
  marginLeft: '7px',
  marginTop: '5px',
};

interface Props {
  name: string;
  label: string;
  value: Record<string, any>;
}

function getNestedSteps(matrix: StepperActions[][], currentIndex: number): number[] {
  return matrix[currentIndex].reduce((prev: number[], curr, currIndex) => {
    if (curr === 'down') return [currIndex, ...prev];
    return prev;
  }, []);
}
const getParentStep = (matrix: StepperActions[][], currentIndex: number) =>
  matrix[currentIndex].findIndex((val) => val === 'up');

const NavigationButtonInput: React.FC<Props> = ({ name }: Props) => {
  const { setFieldValue, values } = useFormikContext();

  const [navType, setNavType] = useState('navigateNext');

  useEffect(() => {
    setNavType(getPropertyFromDottedString(values as Record<string, any>, `${name}.type`));
  }, [name, values]);

  const onSelect = (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
  ) => {
    const val = event.target.value as string;
    setFieldValue(name, { type: val });
    setNavType(val);
  };

  const onSelectStep = (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
  ) => {
    const val = event.target.value as string;
    setFieldValue(name, { type: navType, stepId: val });
  };
  const currentStepIndex = parseInt(name.split('.')[1]);
  const childSteps = getNestedSteps((values as Form).connectivityMatrix, currentStepIndex);
  const childChoices = childSteps.map((i) => {
    const form = values as Form;
    const steps = form.steps;
    if (steps) {
      return { text: steps[i].title === '' ? 'Unnamed' : steps[i].title, value: steps[i].id };
    }
    return { text: 'Unnamed', value: 'Not an ID!' };
  });
  const choices = [
    { text: 'Next', value: 'navigateNext' },
    { text: 'Back', value: 'navigateBack' },
  ];
  if (childChoices.length > 0) {
    choices.push({ text: 'Down', value: 'navigateDown' });
  }
  if (getParentStep((values as Form).connectivityMatrix, currentStepIndex) >= 0) {
    choices.push({ text: 'Up', value: 'navigateUp' });
  }

  return (
    <>
      <h4>Navigation</h4>
      <FormGroup style={inputFieldStyle} row>
        <FormGroup style={inputFieldStyle} row>
          <div style={{ paddingTop: '5px', marginRight: '10px' }}>Navigation type </div>
          <Select name={name} onChange={onSelect} value={navType}>
            {choices.map((choice) => (
              <MenuItem key={choice.text} value={choice.value}>
                {choice.text}
              </MenuItem>
            ))}
          </Select>
        </FormGroup>
        {navType === 'navigateDown' && (
          <FormGroup style={inputFieldStyle} row>
            <div style={{ paddingTop: '5px', marginRight: '10px' }}>Destination </div>
            <Select name={name} onChange={onSelectStep}>
              {childChoices.map((choice) => (
                <MenuItem key={choice.text} value={choice.value}>
                  {choice.text}
                </MenuItem>
              ))}
            </Select>
          </FormGroup>
        )}
      </FormGroup>
    </>
  );
};

export default NavigationButtonInput;
