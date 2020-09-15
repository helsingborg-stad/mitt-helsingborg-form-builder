import React from 'react';
import FieldDescriptor, { OptionLevel } from '../../../types/FieldDescriptor';
import MultipleInputField from '../../general/MultipleInputField';
import { InputFieldPropType } from '../../../types/PropTypes';

const stepFields: FieldDescriptor[] = [
  { name: 'title', type: 'text', initialValue: '', label: 'Title', optionLevel: OptionLevel.Basic },
  { name: 'description', type: 'text', initialValue: '', label: 'Description', optionLevel: OptionLevel.Basic },
  { name: 'group', type: 'text', initialValue: '', label: 'Group', optionLevel: OptionLevel.Intermediate },
  { name: 'id', type: 'text', initialValue: '', label: 'Id', optionLevel: OptionLevel.Advanced },
];

const StepDataField: React.FC<InputFieldPropType> = (props) => {
  return <MultipleInputField fields={stepFields} {...props} />;
};

export default StepDataField;
