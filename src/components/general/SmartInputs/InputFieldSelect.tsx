import React from 'react';
import CSS from 'csstype';
import { Select, MenuItem, FormGroup, Typography } from '@material-ui/core';
import { useFormikContext, FastField } from 'formik';
import { Form } from '../../../types/FormTypes';

const inputFieldStyle: CSS.Properties = {
  marginLeft: '7px',
  marginTop: '5px',
};

interface Props {
  name: string;
  label: string;
}

const InputFieldSelect: React.FC<Props> = ({ name, label }: Props) => {
  const { values } = useFormikContext<Form>();

  if (values?.steps) {
    const questionIds = values.steps.reduce((prev: string[], currentStep) => {
      if (currentStep.questions) {
        return [...prev, ...currentStep.questions.map((q) => q.id)];
      }
      return prev;
    }, []);

    return (
      <FormGroup style={inputFieldStyle} row>
        <div style={{ paddingTop: '5px', marginRight: '10px' }}> {label}</div>
        <FastField as={Select} name={name}>
          {questionIds.map((qId) => (
            <MenuItem key={qId} value={qId}>
              {qId}
            </MenuItem>
          ))}
        </FastField>
      </FormGroup>
    );
  }
  return <Typography>No questions</Typography>;
};

export default InputFieldSelect;
