import React from 'react';
import FieldDescriptor from '../../../types/FieldDescriptor';
import MultipleInputField from '../../../GeneralComponents/MultipleInputField';
import { InputFieldPropType } from '../../../types/PropTypes';

const fields: FieldDescriptor[] = [
  { name: 'category', type: 'text', initialValue: '', label: 'Category id' },
  { name: 'description', type: 'text', initialValue: '', label: 'Display name' },
];

const SubstepListCategoryField: React.FC<InputFieldPropType> = (props: InputFieldPropType) => {
  return <MultipleInputField fields={fields} {...props} />;
};

export default SubstepListCategoryField;
