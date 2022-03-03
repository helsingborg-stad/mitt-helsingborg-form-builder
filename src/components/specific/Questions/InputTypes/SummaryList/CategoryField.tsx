import React from 'react';
import FieldDescriptor from '../../../../../types/FieldDescriptor';
import MultipleInputField from '../../../../general/MultipleInputField';
import { InputFieldPropType } from '../../../../../types/PropTypes';

const fields: FieldDescriptor[] = [
  { name: 'category', type: 'text', initialValue: '', label: 'Category id' },
  { name: 'description', type: 'text', initialValue: '', label: 'Display name' },
  { name: 'sortField', type: 'text', initialValue: '', label: 'Sort field' },
];

const CategoryField: React.FC<InputFieldPropType> = (props: InputFieldPropType) => {
  return <MultipleInputField fields={fields} {...props} />;
};

export default CategoryField;
