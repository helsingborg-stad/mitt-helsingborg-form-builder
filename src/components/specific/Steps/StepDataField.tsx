import React from 'react';
import FieldDescriptor from '../../../types/FieldDescriptor';
import MultipleInputField from '../../general/MultipleInputField';
import { InputFieldPropType } from '../../../types/PropTypes';

const colorChoices = [
  { value: 'blue', name: 'Blue' },
  { value: 'green', name: 'Green' },
  { value: 'red', name: 'Red' },
  { value: 'purple', name: 'Purple' },
  { value: 'neutral', name: 'Neutral' },
];

const stepFields: FieldDescriptor[] = [
  { name: 'title', type: 'text', initialValue: '', label: 'Title (big headline)' },
  { name: 'group', type: 'text', initialValue: '', label: 'Group (small text under icon) ' },
  { name: 'description', type: 'text', initialValue: '', label: 'Description (small descriptive text below title)' },
  {
    name: 'colorSchema',
    type: 'select',
    initialValue: '',
    label: 'Color theme',
    choices: colorChoices,
  },
];

const StepDataField: React.FC<InputFieldPropType> = (props) => {
  return <MultipleInputField fields={stepFields} {...props} />;
};

export default StepDataField;
