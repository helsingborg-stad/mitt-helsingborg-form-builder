import React from 'react';
import TextFieldWrapper from '../TextFieldWrapper';
import { useFormikContext } from 'formik';

interface Props {
  name: string;
  label: string;
  value: Record<string, unknown>;
}

const TagsInput: React.FC<Props> = ({ name, label, value }: Props) => {
  const regexWhitespaceCharacter = /\s/g;
  const { setFieldValue } = useFormikContext();
  const onChange = (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
  ) => {
    const val = event.target.value as string;
    const tags = val.replace(regexWhitespaceCharacter, '').split(',').filter(Boolean);
    if (setFieldValue) {
      setFieldValue(name, tags);
    }
  };
  return (
    <TextFieldWrapper fullWidth multiline rowsMax={3} name={name} onChange={onChange} value={value} label={label} />
  );
};

export default TagsInput;
