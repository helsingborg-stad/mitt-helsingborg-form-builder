import React from 'react';
import FieldDescriptor, { InputType } from '../../../../types/FieldDescriptor';
import MultipleInputField from '../../../general/MultipleInputField';
import { InputFieldPropType } from '../../../../types/PropTypes';
import QuestionTypeSelect from '../QuestionTypeSelect';
import SelectChoice from './SelectChoice';
import { ValidationFieldTypes } from '../ValidationRules';

const editableListFields: FieldDescriptor[] = [
  { name: 'label', type: 'text', initialValue: '', label: 'Label' },
  { name: 'key', type: 'text', initialValue: '', label: 'Key' },
  { name: 'tags', type: 'tags', initialValue: '', label: 'Tags (enter as comma-separated list of words)' },
  { name: 'loadPrevious', type: 'loadPreviousToggle', initialValue: '', label: 'Load data from previous case?' },
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
  { selectValue: 'select', displayName: 'Select (dropdown)', inputType: 'select' },
];
const extraInputs: Partial<Record<InputType, FieldDescriptor[]>> = {
  select: [{ name: 'items', type: 'array', initialValue: '', label: 'Choices', inputField: SelectChoice }],
};

const EditableListInputField: React.FC<InputFieldPropType> = (props: InputFieldPropType) => {
  const { value } = props;
  const extraInput = Object.keys(extraInputs).includes(value.type) && extraInputs[value.type as InputType];
  return (
    <>
      <QuestionTypeSelect name={props.name} value={props.value} label="Input field type" choices={typeChoices} />
      <MultipleInputField fields={editableListFields} {...props} />
      {extraInput && <MultipleInputField fields={extraInput} {...props} />}
    </>
  );
};

export default EditableListInputField;
