import React from 'react';
import FieldDescriptor, { InputType } from '../../../../types/FieldDescriptor';
import MultipleInputField from '../../../general/MultipleInputField';
import { InputFieldPropType } from '../../../../types/PropTypes';
import QuestionTypeSelect from '../QuestionTypeSelect';

const fields: FieldDescriptor[] = [
  { name: 'title', type: 'text', initialValue: '', label: 'Title' },
  { name: 'id', type: 'questionIdPicker', initialValue: '', label: 'Field id' },
  { name: 'category', type: 'text', initialValue: '', label: 'Category' },
];

const typeChoices: { displayName: string; selectValue: string; inputType: InputType; validationType?: string }[] = [
  { selectValue: 'text', displayName: 'Text', inputType: 'text', validationType: 'text' },
  { selectValue: 'email', displayName: 'Email', inputType: 'text', validationType: 'email' },
  { selectValue: 'postalCode', displayName: 'Postnummer', inputType: 'number', validationType: 'postalcode' },
  { selectValue: 'personalNumber', displayName: 'Personnummer', inputType: 'number', validationType: 'personalNumber' },
  { selectValue: 'phone', displayName: 'Telefonnummer', inputType: 'number', validationType: 'phonenumber' },
  { selectValue: 'number', displayName: 'Number', inputType: 'number', validationType: 'number' },
  { selectValue: 'date', displayName: 'Date', inputType: 'date' },
  // Array types
  { selectValue: 'arrayText', displayName: 'Repeater Text', inputType: 'arrayText', validationType: 'text' },
  { selectValue: 'arrayEmail', displayName: 'Repeater Email', inputType: 'arrayText', validationType: 'email' },
  {
    selectValue: 'arrayPostalCode',
    displayName: 'Repeater Postnummer',
    inputType: 'arrayNumber',
    validationType: 'postalcode',
  },
  {
    selectValue: 'arrayPersonalNumber',
    displayName: 'Repeater Personnummer',
    inputType: 'arrayNumber',
    validationType: 'personalNumber',
  },
  {
    selectValue: 'arrayPhone',
    displayName: 'Repeater Telefonnummer',
    inputType: 'arrayNumber',
    validationType: 'phonenumber',
  },
  { selectValue: 'arrayNumber', displayName: 'Repeater Number', inputType: 'arrayNumber', validationType: 'number' },
  { selectValue: 'arrayDate', displayName: 'Repeater Date', inputType: 'arrayDate' },
];

const extraInputs: Record<string, FieldDescriptor[]> = {
  arrayText: [
    {
      name: 'inputId',
      type: 'text',
      initialValue: '',
      label: 'Input id (should match the id of repeater input field id)',
    },
  ],
  arrayNumber: [
    {
      name: 'inputId',
      type: 'text',
      initialValue: '',
      label: 'Input id (should match the id of repeater input field id)',
    },
  ],
  arrayDate: [
    {
      name: 'inputId',
      type: 'text',
      initialValue: '',
      label: 'Input id (should match the id of repeater input field id)',
    },
  ],
};

const SummaryListItemField: React.FC<InputFieldPropType> = (props: InputFieldPropType) => {
  const { value } = props;
  const extraInput = Object.keys(extraInputs).includes(value.type) && extraInputs[value.type];
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
      {extraInput ? <MultipleInputField fields={extraInput} {...props} /> : null}
    </>
  );
};

export default SummaryListItemField;
