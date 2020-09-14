import React from 'react';
import FieldDescriptor from '../../../../types/FieldDescriptor';
import MultipleInputField from '../../../general/MultipleInputField';
import { InputFieldPropType } from '../../../../types/PropTypes';

const fields: FieldDescriptor[] = [
  { name: 'title', type: 'text', initialValue: '', label: 'Title' },
  { name: 'category', type: 'text', initialValue: '', label: 'Category' },
  { name: 'formId', type: 'formSelect', initialValue: '', label: 'Subform' },
  { name: 'loadPrevious', type: 'loadPreviousToggle', initialValue: '', label: 'Load data from previous case?' },
];

const SubstepListItemField: React.FC<InputFieldPropType> = (props: InputFieldPropType) => {
  return <MultipleInputField fields={fields} {...props} />;
};

export default SubstepListItemField;
