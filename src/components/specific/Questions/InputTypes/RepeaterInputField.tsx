import React from 'react';
import FieldDescriptor, { InputType } from '../../../../types/FieldDescriptor';
import MultipleInputField from '../../../general/MultipleInputField';
import { InputFieldPropType } from '../../../../types/PropTypes';
import QuestionTypeSelect from '../QuestionTypeSelect';
import { ValidationFieldTypes } from '../ValidationRules';
import SelectChoice from './SelectChoice';

const fields: FieldDescriptor[] = [
  { name: 'title', type: 'text', initialValue: '', label: 'Title' },
  { name: 'id', type: 'text', initialValue: '', label: 'Field id' },
  { name: 'tags', type: 'tags', initialValue: '', label: 'Tags (enter as comma-separated list of words)' },
];

const typeChoices: {
  displayName: string;
  selectValue: string;
  inputType: InputType;
  validationType?: ValidationFieldTypes;
}[] = [
  { selectValue: 'text', displayName: 'Text', inputType: 'text', validationType: 'text' },
  { selectValue: 'email', displayName: 'Email', inputType: 'text', validationType: 'email' },
  { selectValue: 'postalCode', displayName: 'Postnummer', inputType: 'number', validationType: 'postalCode' },
  { selectValue: 'personalNumber', displayName: 'Personnummer', inputType: 'number', validationType: 'personalNumber' },
  { selectValue: 'phone', displayName: 'Telefonnummer', inputType: 'number', validationType: 'phoneNumber' },
  { selectValue: 'number', displayName: 'Number', inputType: 'number', validationType: 'number' },
  { selectValue: 'date', displayName: 'Date', inputType: 'date', validationType: 'date' },
  { selectValue: 'checkbox', displayName: 'Checkbox', inputType: 'checkbox', validationType: 'checkbox' },
  { selectValue: 'select', displayName: 'Select (dropdown)', inputType: 'select', validationType: 'select' },
];

const extraInputs: Partial<Record<InputType, FieldDescriptor[]>> = {
  select: [{ name: 'items', type: 'array', initialValue: '', label: 'Choices', inputField: SelectChoice }],
};

const RepeaterInputField: React.FC<InputFieldPropType> = (props: InputFieldPropType) => {
  const { value } = props;
  const extraInput = Object.keys(extraInputs).includes(value.type) && extraInputs[value.type as InputType];

  return (
    <>
      <MultipleInputField fields={fields} {...props} />
      <QuestionTypeSelect name={props.name} value={props.value} label="Input field type" choices={typeChoices} />
      {extraInput && <MultipleInputField fields={extraInput} {...props} />}
    </>
  );
};

export default RepeaterInputField;
