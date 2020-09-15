import React from 'react';
import FieldDescriptor, { OptionLevel } from '../../../../types/FieldDescriptor';
import MultipleInputField from '../../../general/MultipleInputField';
import { InputFieldPropType } from '../../../../types/PropTypes';

const fields: FieldDescriptor[] = [
  { name: 'category', type: 'text', initialValue: '', label: 'Category id', optionLevel: OptionLevel.Advanced },
  { name: 'description', type: 'text', initialValue: '', label: 'Display name', optionLevel: OptionLevel.Basic },
];

const SubstepListCategoryField: React.FC<InputFieldPropType> = (props: InputFieldPropType) => {
  return <MultipleInputField fields={fields} {...props} />;
};

export default SubstepListCategoryField;
