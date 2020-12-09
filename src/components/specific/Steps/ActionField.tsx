import React from 'react';
import FieldDescriptor from '../../../types/FieldDescriptor';
import MultipleInputField from '../../general/MultipleInputField';
import { InputFieldPropType } from '../../../types/PropTypes';

const actionFields: FieldDescriptor[] = [
  {
    name: 'type',
    type: 'select',
    initialValue: '',
    label: 'Type',
    choices: [
      { name: 'Next', value: 'next' },
      { name: 'Submit', value: 'submit' },
      { name: 'Sign', value: 'sign' },
      { name: 'Close', value: 'close' },
      { name: 'Back to Main Form', value: 'backToMain' },
    ],
  },
  { name: 'label', type: 'text', initialValue: '', label: 'Label' },
  {
    name: 'color',
    type: 'select',
    initialValue: '',
    label: 'Button color',
    choices: [
      { value: 'blue', name: 'Blue' },
      { value: 'green', name: 'Green' },
      { value: 'red', name: ' Red' },
      { value: 'purple', name: 'Purple' },
      { value: 'neutral', name: 'Neutral (gray)' },
    ],
  },
];

const ActionField: React.FC<InputFieldPropType> = (props) => {
  return <MultipleInputField fields={actionFields} {...props} />;
};

export default ActionField;
