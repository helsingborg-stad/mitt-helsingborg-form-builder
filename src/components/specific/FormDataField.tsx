import React from 'react';
import FieldDescriptor from '../../types/FieldDescriptor';
import MultipleInputField from '../general/MultipleInputField';
import { InputFieldPropType } from '../../types/PropTypes';

const formFields: FieldDescriptor[] = [
  { name: 'name', type: 'text', initialValue: '', label: 'Name' },
  { name: 'description', type: 'text', initialValue: '', label: 'Description' },
  { name: 'provider', type: 'text', initialValue: '', label: 'Provider' },
  {
    name: 'formType',
    type: 'select',
    initialValue: '',
    label: 'Form Type',
    choices: [
      { name: 'None', value: '' },
      { name: 'EKB löpande', value: 'EKB-recurring' },
      { name: 'EKB grund', value: 'EKB-new' },
      { name: 'EKB stickprov/komplettering', value: 'EKB-completion' },
    ],
  },
];

const FormDataField: React.FC<InputFieldPropType> = (props: InputFieldPropType) => {
  return (
    <>
      <MultipleInputField fields={formFields} {...props} />
    </>
  );
};

export default FormDataField;
