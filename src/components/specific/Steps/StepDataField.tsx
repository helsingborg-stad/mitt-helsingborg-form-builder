import React from 'react';
import FieldDescriptor from '../../../types/FieldDescriptor';
import MultipleInputField from '../../general/MultipleInputField';
import { InputFieldPropType } from '../../../types/PropTypes';

const stepFields: FieldDescriptor[] = [
  { name: 'title', type: 'text', initialValue: '', label: 'Title (big headline)' },
  { name: 'group', type: 'text', initialValue: '', label: 'Group (small text under icon) ' },
  { name: 'description', type: 'text', initialValue: '', label: 'Description (small descriptive text below title)' },
  { name: 'id', type: 'text', initialValue: '', label: 'Id' },
];

const StepDataField: React.FC<InputFieldPropType> = (props) => {
  return <MultipleInputField fields={stepFields} {...props} />;
};

export default StepDataField;
