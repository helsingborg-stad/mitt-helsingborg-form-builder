import React from 'react';
import FieldDescriptor, { OptionLevel } from '../../types/FieldDescriptor';
import MultipleInputField from '../general/MultipleInputField';
import { InputFieldPropType } from '../../types/PropTypes';

const formFields: FieldDescriptor[] = [
  { name: 'name', type: 'text', initialValue: '', label: 'Name', optionLevel: OptionLevel.Basic },
  { name: 'description', type: 'text', initialValue: '', label: 'Description', optionLevel: OptionLevel.Basic },
  { name: 'provider', type: 'text', initialValue: '', label: 'Provider', optionLevel: OptionLevel.Intermediate },
  { name: 'subform', type: 'checkbox', initialValue: true, label: 'Subform', optionLevel: OptionLevel.Basic },
];

const formTypeInput: FieldDescriptor = {
  name: 'formType',
  type: 'select',
  initialValue: '',
  label: 'Form Type (only for main forms)',
  choices: [
    { name: 'None', value: '' },
    { name: 'EKB löpande', value: 'EKB-recurring' },
    { name: 'EKB grund', value: 'EKB-new' },
  ],
  optionLevel: OptionLevel.Basic,
};

const FormDataField: React.FC<InputFieldPropType> = (props: InputFieldPropType) => {
  const { value } = props;
  return (
    <>
      <MultipleInputField fields={formFields} {...props} />
      {!value.subform && <MultipleInputField fields={[formTypeInput]} {...props} />}
    </>
  );
};

export default FormDataField;
