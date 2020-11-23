import React from 'react';
import TextFieldWrapper from '../TextFieldWrapper';
import { useFormikContext } from 'formik';

interface Props {
  name: string;
  label: string;
  value: Record<string, any>;
}

const TagsInput: React.FC<Props> = ({ name, label, value }: Props) => {
  const { setFieldValue } = useFormikContext();
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
  return (
    <TextFieldWrapper fullWidth multiline rowsMax={3} name={name} onChange={onChange} value={value} label={label} />
  );
};

export default TagsInput;
