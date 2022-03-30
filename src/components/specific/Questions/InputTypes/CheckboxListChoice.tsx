import React from 'react';
import FieldDescriptor from '../../../../types/FieldDescriptor';
import MultipleInputField from '../../../general/MultipleInputField';
import { InputFieldPropType } from '../../../../types/PropTypes';

const fields: FieldDescriptor[] = [
  { name: 'displayText', type: 'text', initialValue: '', label: 'Display text' },
  { name: 'tags', type: 'tags', initialValue: '', label: 'Tags (enter as comma-separated list of words)' },
  { name: 'id', type: 'text', initialValue: '', label: 'Choice ID' },
];

const CheckboxListChoice: React.FC<InputFieldPropType> = (props: InputFieldPropType) => {
  return <MultipleInputField fields={fields} {...props} />;
};

export default CheckboxListChoice;
