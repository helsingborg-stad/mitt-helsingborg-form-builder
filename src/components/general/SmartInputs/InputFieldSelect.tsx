import React from 'react';
import CSS from 'csstype';
import { Select, MenuItem, FormGroup, FormControlLabel, Typography } from '@material-ui/core';
import { useFormikContext } from 'formik';
import { Form } from '../../../types/FormTypes';

const inputFieldStyle: CSS.Properties = {
  marginLeft: '7px',
  marginTop: '5px',
};

interface Props {
  name: string;
  label: string;
  value: Record<string, any>;
  setFieldValue?: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
}

const InputFieldSelect: React.FC<Props> = ({ name, label, value, setFieldValue }: Props) => {
  const { values } = useFormikContext<Form>();
  const onSelect = (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
  ) => {
    const val = event.target.value as string;
    if (setFieldValue) {
      setFieldValue(name, val);
    }
  };

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

        <Select name={name} onChange={onSelect} value={value.id}>
          {questionIds.map((qId) => (
            <MenuItem key={qId} value={qId}>
              {qId}
            </MenuItem>
          ))}
        </Select>
      </FormGroup>
    );
  }
  return <Typography>No questions</Typography>;
};

export default InputFieldSelect;
