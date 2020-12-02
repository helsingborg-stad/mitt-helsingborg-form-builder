import React from 'react';
import FieldDescriptor from '../../../../types/FieldDescriptor';
import MultipleInputField from '../../../general/MultipleInputField';
import { InputFieldPropType } from '../../../../types/PropTypes';

const fields: FieldDescriptor[] = [
  { name: 'displayText', type: 'text', initialValue: '', label: 'Display text' },
  { name: 'value', type: 'text', initialValue: '', label: 'Value' },
];

const RadioButtonChoice: React.FC<InputFieldPropType> = (props: InputFieldPropType) => {
  return <MultipleInputField fields={fields} {...props} />;
};

export default RadioButtonChoice;
