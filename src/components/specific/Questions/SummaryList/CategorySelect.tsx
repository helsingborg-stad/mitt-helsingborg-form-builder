import React from 'react';
import CSS from 'csstype';
import { Select, MenuItem, FormGroup } from '@material-ui/core';
import { useFormikContext } from 'formik';
import { Form } from '../../../../types/FormTypes';

const inputFieldStyle: CSS.Properties = {
  marginLeft: '7px',
  marginTop: '5px',
};

interface Props {
  name: string;
  label: string;
  value: string;
  choices: { displayName: string; value: string }[];
}

const CategorySelect: React.FC<Props> = ({ name, label, value, choices }) => {
  const { setFieldValue } = useFormikContext<Form>();

  const onChange = (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
  ) => {
    const val = event.target.value as string;
    const choice = choices.find((ch) => ch.value === val);
    if (choice) {
      setFieldValue(`${name}.category`, choice.value);
    }
  };

  return (
    <FormGroup style={inputFieldStyle} row>
      <div style={{ paddingTop: '5px', marginRight: '10px' }}>{label} </div>
      <Select onChange={onChange} value={value || ''}>
        {choices
          ? choices.map((choice) => (
              <MenuItem key={choice.value} value={choice.value}>
                {choice.displayName}
              </MenuItem>
            ))
          : null}
      </Select>
    </FormGroup>
  );
};

export default CategorySelect;
