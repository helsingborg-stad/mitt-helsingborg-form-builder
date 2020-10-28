import React from 'react';
import { TextField } from '@material-ui/core';

interface Props {
  name: string;
  label: string;
  value: Record<string, any>;
  setFieldValue?: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
}

const TagsInput: React.FC<Props> = ({ name, label, value, setFieldValue }: Props) => {
  const onChange = (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
  ) => {
    const val = event.target.value as string;
    const tags = val.split(',').map((s) => s.trim());
    if (setFieldValue) {
      setFieldValue(name, tags);
    }
  };
  console.log('value', value);
  return <TextField fullWidth multiline rowsMax={3} name={name} onChange={onChange} value={value} label={label} />;
};

export default TagsInput;
