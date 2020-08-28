import React from 'react';
import FieldDescriptor from '../../../types/FieldDescriptor';
import MultipleInputField from '../../general/MultipleInputField';
import { InputFieldPropType } from '../../../types/PropTypes';

const actionFields: FieldDescriptor[] = [
  {
    name: 'type',
    type: 'select',
    initialValue: 'next',
    label: 'Type',
    choices: [
      { name: 'Start', value: 'start' },
      { name: 'Next', value: 'next' },
      { name: 'Submit', value: 'submit' },
      { name: 'Close', value: 'close' },
    ],
  },
  { name: 'label', type: 'text', initialValue: '', label: 'Label' },
  { name: 'color', type: 'text', initialValue: 'green', label: 'Button color' },
];

const ActionField: React.FC<InputFieldPropType> = (props) => {
  return <MultipleInputField fields={actionFields} {...props} />;
};

export default ActionField;
