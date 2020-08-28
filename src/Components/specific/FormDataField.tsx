import React from 'react';
import FieldDescriptor from '../../types/FieldDescriptor';
import MultipleInputField from '../general/MultipleInputField';
import { InputFieldPropType } from '../../types/PropTypes';

const formFields: FieldDescriptor[] = [
  { name: 'name', type: 'text', initialValue: '', label: 'Name' },
  { name: 'description', type: 'text', initialValue: '', label: 'Description' },
  { name: 'provider', type: 'text', initialValue: '', label: 'Group' },
  { name: 'subform', type: 'checkbox', initialValue: true, label: 'Subform' },
];

const FormDataField: React.FC<InputFieldPropType> = (props: InputFieldPropType) => {
  return <MultipleInputField fields={formFields} {...props} />;
};

export default FormDataField;
