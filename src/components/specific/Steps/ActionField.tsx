import React from 'react';
import FieldDescriptor, { OptionLevel } from '../../../types/FieldDescriptor';
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
      { name: 'Sign', value: 'sign' },
      { name: 'Close', value: 'close' },
    ],
    optionLevel: OptionLevel.Basic,
  },
  { name: 'label', type: 'text', initialValue: '', label: 'Label', optionLevel: OptionLevel.Basic },
  { name: 'color', type: 'text', initialValue: 'green', label: 'Button color', optionLevel: OptionLevel.Intermediate },
];

const ActionField: React.FC<InputFieldPropType> = (props) => {
  return <MultipleInputField fields={actionFields} {...props} />;
};

export default ActionField;
