import React from 'react';
import FieldDescriptor from '../types/FieldDescriptor';
import MultipleInputField from '../GeneralComponents/MultipleInputField';

interface Props {
  name: string;
  value: Record<string, any>;
  type: string;
  onBlur: (e?: any) => void;
  onChange: (e?: any) => void;
}

const formFields: FieldDescriptor[] = [
  { name: 'name', type: 'text', initialValue: '', label: 'Name' },
  { name: 'description', type: 'text', initialValue: '', label: 'Description' },
  { name: 'provider', type: 'text', initialValue: '', label: 'Group' },
  { name: 'subform', type: 'checkbox', initialValue: true, label: 'Subform' },
];

const FormDataField: React.FC<Props> = (props) => {
  return <MultipleInputField fields={formFields} {...props} />;
};

export default FormDataField;
