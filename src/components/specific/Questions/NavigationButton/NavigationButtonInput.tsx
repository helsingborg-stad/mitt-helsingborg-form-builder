import React, { useEffect, useState } from 'react';
import CSS from 'csstype';
import { Select, MenuItem, FormGroup } from '@material-ui/core';
import { useFormikContext } from 'formik';
import { getPropertyFromDottedString } from '../../../../helpers/object';
import { Form, Step, ListItem } from '../../../../types/FormTypes';

const inputFieldStyle: CSS.Properties = {
  marginLeft: '7px',
  marginTop: '5px',
};

interface Props {
  name: string;
  label: string;
  value: Record<string, any>;
}

const findCurrentStepItem = (root: ListItem[], id: string, level = 0): [ListItem | undefined, ListItem[], number] => {
  const step = root.find((i) => i.id === id);
  if (step) return [step, root, level];
  for (const step of root) {
    if (step.children) {
      const [c] = findCurrentStepItem(step.children, id, level + 1);
      if (c) return [c, step.children, level + 1];
    }
  }
  return [undefined, [], -1];
};
const emptyStepData: [ListItem | undefined, ListItem[], number] = [undefined, [], -1];

/** get the indices in form.steps of all the child steps of the current step */
function getNestedSteps(step: ListItem, steps: Step[]): number[] {
  if (step && step.children) {
    return step.children.map((s) => steps.findIndex((st) => st.id === s.id));
  }
  return [];
}

const NavigationButtonInput: React.FC<Props> = ({ name }: Props) => {
  const { setFieldValue, values } = useFormikContext<Form>();

  const [navType, setNavType] = useState('navigateNext');
  const [targetStepId, setTargetStepId] = useState('');
  const [currentStepData, setCurrentStepData] = useState(emptyStepData);

  useEffect(() => {
    const navT = getPropertyFromDottedString(values as Record<string, any>, `${name}.type`);
    setNavType(getPropertyFromDottedString(values as Record<string, any>, `${name}.type`));
    if (navT === 'navigateDown') {
      setTargetStepId(getPropertyFromDottedString(values as Record<string, any>, `${name}.stepId`));
    }
  }, [name, values]);

  useEffect(() => {
    const currentStepIndex = parseInt(name.split('.')[1]);
    const currentStep = (values?.steps || [])[currentStepIndex];
    setCurrentStepData(findCurrentStepItem(values.stepStructure, currentStep.id));
  }, [values.stepStructure, values?.steps, name]);

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
    setTargetStepId(val);
  };

  const childSteps: number[] = currentStepData[0] ? getNestedSteps(currentStepData[0], values.steps || []) : [];

  const childChoices = childSteps.map((i) => {
    const form = values as Form;
    const steps = form.steps;
    if (steps) {
      return { text: steps[i].title === '' ? 'Unnamed' : steps[i].title, value: steps[i].id };
    }
    return { text: 'Unnamed', value: 'Not an ID!' };
  });
  const choices: { text: string; value: string }[] = [
    { text: 'Next', value: 'navigateNext' },
    { text: 'Back', value: 'navigateBack' },
  ];
  if (childChoices.length > 0) {
    choices.push({ text: 'Down', value: 'navigateDown' });
  }
  if (currentStepData[2] > 0) {
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
            <Select name={name} onChange={onSelectStep} value={targetStepId}>
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
