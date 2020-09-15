import React from 'react';
import FieldDescriptor, { OptionLevel } from '../../../../types/FieldDescriptor';
import MultipleInputField from '../../../general/MultipleInputField';
import { InputFieldPropType } from '../../../../types/PropTypes';

const fields: FieldDescriptor[] = [
  { name: 'title', type: 'text', initialValue: '', label: 'Title', optionLevel: OptionLevel.Basic },
  { name: 'category', type: 'text', initialValue: '', label: 'Category', optionLevel: OptionLevel.Basic },
  { name: 'formId', type: 'formSelect', initialValue: '', label: 'Subform', optionLevel: OptionLevel.Basic },
  {
    name: 'loadPrevious',
    type: 'loadPreviousToggle',
    initialValue: '',
    label: 'Load data from previous case?',
    optionLevel: OptionLevel.Advanced,
  },
];

const SubstepListItemField: React.FC<InputFieldPropType> = (props: InputFieldPropType) => {
  return <MultipleInputField fields={fields} {...props} />;
};

export default SubstepListItemField;
