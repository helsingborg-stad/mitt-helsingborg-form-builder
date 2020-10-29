import React from 'react';
import FieldDescriptor, { InputType } from '../../../types/FieldDescriptor';
import MultipleInputField from '../../general/MultipleInputField';
import { InputFieldPropType } from '../../../types/PropTypes';
import QuestionTypeSelect from './QuestionTypeSelect';

const fields: FieldDescriptor[] = [
  { name: 'title', type: 'text', initialValue: '', label: 'Title' },
  { name: 'id', type: 'text', initialValue: '', label: 'Field id' },
  { name: 'tags', type: 'tags', initialValue: '', label: 'Tags (enter as comma-separated list of words)' },
];

const typeChoices: { displayName: string; selectValue: string; inputType: InputType; validationType?: string }[] = [
  { selectValue: 'text', displayName: 'Text', inputType: 'text', validationType: 'text' },
  { selectValue: 'email', displayName: 'Email', inputType: 'text', validationType: 'email' },
  { selectValue: 'postalCode', displayName: 'Postnummer', inputType: 'number', validationType: 'postalcode' },
  { selectValue: 'personalNumber', displayName: 'Personnummer', inputType: 'number', validationType: 'personalNumber' },
  { selectValue: 'phone', displayName: 'Telefonnummer', inputType: 'number', validationType: 'phonenumber' },
  { selectValue: 'number', displayName: 'Number', inputType: 'number', validationType: 'number' },
  { selectValue: 'date', displayName: 'Date', inputType: 'date' },
  { selectValue: 'checkbox', displayName: 'Checkbox', inputType: 'checkbox' },
];

const RepeaterInputField: React.FC<InputFieldPropType> = (props: InputFieldPropType) => {
  return (
    <>
      <MultipleInputField fields={fields} {...props} />
      <QuestionTypeSelect
        name={props.name}
        value={props.value}
        initialValue={'text'}
        label="Input field type"
        choices={typeChoices}
        setFieldValue={props.setFieldValue}
      />
    </>
  );
};

export default RepeaterInputField;
