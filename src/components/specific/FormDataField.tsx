import React from 'react';
import FieldDescriptor from '../../types/FieldDescriptor';
import MultipleInputField from '../general/MultipleInputField';
import { InputFieldPropType } from '../../types/PropTypes';

const formFields: FieldDescriptor[] = [
  { name: 'name', type: 'text', initialValue: '', label: 'Name' },
  { name: 'description', type: 'text', initialValue: '', label: 'Description' },
  { name: 'provider', type: 'text', initialValue: '', label: 'Provider' },
  { name: 'subform', type: 'checkbox', initialValue: true, label: 'Subform' },
];

const formTypeInput: FieldDescriptor = { 
  name: 'formType', 
  type: 'select', 
  initialValue: '', 
  label:'Form Type (only for main forms)', 
  choices: [
    { name: 'None', value: ''},
    { name: 'EKB löpande', value: 'EKB-recurring'},
    { name: 'EKB grund', value: 'EKB-new'},
  ]};


const FormDataField: React.FC<InputFieldPropType> = (props: InputFieldPropType) => {
  const { value } = props;
  return (
    <>
      <MultipleInputField fields={formFields} {...props} />
      { !value.subform && <MultipleInputField fields={[formTypeInput]} {...props} /> }
    </>
  );
};

export default FormDataField;
