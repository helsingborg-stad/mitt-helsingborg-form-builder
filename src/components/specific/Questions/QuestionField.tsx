import React from 'react';
import FieldDescriptor, { InputType } from '../../../types/FieldDescriptor';
import MultipleInputField from '../../general/MultipleInputField';
import EditableListInputField from './InputTypes/EditableListInputField';
import { InputFieldPropType } from '../../../types/PropTypes';
import NavigationButtonField from './InputTypes/NavigationButton/NavigationButtonField';
import SummaryListItemField from './InputTypes/SummaryList/SummaryListItemField';
import RepeaterInputField from './InputTypes/RepeaterInputField';
import CategoryField from './InputTypes/SummaryList/CategoryField';
import QuestionTypeSelect from './QuestionTypeSelect';
import { ValidationFieldTypes } from './ValidationRules';
import RadioButtonChoice from './InputTypes/RadioButtonChoice';
import SelectChoice from './InputTypes/SelectChoice';
import HelpField from './HelpField';

const questionFields: FieldDescriptor[] = [
  { name: 'label', type: 'text', initialValue: '', label: 'Label' },
  { name: 'labelHelp', type: 'text', initialValue: '', label: 'Helper' },
  { name: 'description', type: 'text', initialValue: '', label: 'Description' },
  { name: 'id', type: 'text', initialValue: '', label: 'Id' },
  { name: 'conditionalOn', type: 'text', initialValue: '', label: 'Conditional on (field id)' },
  { name: 'showHelp', type: 'checkbox', initialValue: '', label: 'Add help to the question?' },
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
  { selectValue: 'date', displayName: 'Date', inputType: 'date' },
  { selectValue: 'editableList', displayName: 'Editable List', inputType: 'editableList' },
  { selectValue: 'checkbox', displayName: 'Checkbox', inputType: 'checkbox' },
  { selectValue: 'avatarList', displayName: 'Avatar List (family members)', inputType: 'avatarList' },
  { selectValue: 'navigationButton', displayName: 'Navigation button', inputType: 'navigationButton' },
  { selectValue: 'navigationButtonGroup', displayName: 'Navigation button group', inputType: 'navigationButtonGroup' },
  { selectValue: 'summaryList', displayName: 'Summary List', inputType: 'summaryList' },
  { selectValue: 'repeaterField', displayName: 'Repeater Field', inputType: 'repeaterField' },
  { selectValue: 'radioGroup', displayName: 'Radio buttons', inputType: 'radioGroup' },
  { selectValue: 'select', displayName: 'Select (dropdown menu)', inputType: 'select' },
];

const extraInputs: Partial<Record<InputType, FieldDescriptor[]>> = {
  text: [
    { name: 'placeholder', type: 'text', initialValue: '', label: 'Placeholder' },
    { name: 'tags', type: 'tags', initialValue: '', label: 'Tags (enter as comma-separated list of words)' },
    { name: 'loadPrevious', type: 'loadPreviousToggle', initialValue: '', label: 'Load data from previous case?' },
  ],
  number: [
    { name: 'placeholder', type: 'text', initialValue: '', label: 'Placeholder' },
    { name: 'tags', type: 'tags', initialValue: '', label: 'Tags (enter as comma-separated list of words)' },
    { name: 'loadPrevious', type: 'loadPreviousToggle', initialValue: '', label: 'Load data from previous case?' },
  ],
  date: [{ name: 'tags', type: 'tags', initialValue: '', label: 'Tags (enter as comma-separated list of words)' }],
  editableList: [
    { name: 'title', type: 'text', initialValue: '', label: 'Title' },
    { name: 'startEditable', type: 'checkbox', initialValue: 'false', label: 'Start in editable mode' },
    { name: 'inputs', type: 'array', initialValue: '', label: 'Inputs', inputField: EditableListInputField },
  ],
  checkbox: [
    { name: 'text', type: 'text', initialValue: '', label: 'Text' },
    { name: 'color', type: 'text', initialValue: 'light', label: 'Color' },
    { name: 'tags', type: 'tags', initialValue: '', label: 'Tags (enter as comma-separated list of words)' },
    { name: 'loadPrevious', type: 'loadPreviousToggle', initialValue: '', label: 'Load data from previous case?' },
  ],
  avatarList: [{ name: 'heading', type: 'text', initialValue: '', label: 'Title' }],
  navigationButton: [
    { name: 'text', type: 'text', initialValue: '', label: 'Button text' },
    { name: 'color', type: 'text', initialValue: 'light', label: 'Color' },
    { name: 'iconName', type: 'text', initialValue: '', label: 'Icon name' },
    {
      name: 'navigationType',
      type: 'navigationButton',
      initialValue: '',
      label: 'Navigation Button',
    },
  ],
  navigationButtonGroup: [
    { name: 'horizontal', type: 'checkbox', initialValue: false, label: 'Horizontal' },
    { name: 'buttons', type: 'array', initialValue: '', label: 'Buttons', inputField: NavigationButtonField },
  ],
  summaryList: [
    { name: 'heading', type: 'text', initialValue: '', label: 'List heading' },
    { name: 'color', type: 'text', initialValue: 'light', label: 'Color theme' },
    { name: 'showSum', type: 'checkbox', initialValue: 'true', label: 'Show sum' },
    { name: 'startEditable', type: 'checkbox', initialValue: 'false', label: 'Start in editable mode' },
    { name: 'categories', type: 'array', initialValue: '', label: 'Categories', inputField: CategoryField },
    { name: 'items', type: 'array', initialValue: '', label: 'Items', inputField: SummaryListItemField },
  ],
  repeaterField: [
    { name: 'heading', type: 'text', initialValue: '', label: 'List heading' },
    { name: 'addButtonText', type: 'text', initialValue: '', label: 'Button Text (to add an item)' },
    { name: 'color', type: 'text', initialValue: 'light', label: 'Color theme' },
    { name: 'loadPrevious', type: 'loadPreviousToggle', initialValue: '', label: 'Load data from previous case?' },
    { name: 'inputs', type: 'array', initialValue: '', label: 'Inputs (rows)', inputField: RepeaterInputField },
  ],
  radioGroup: [{ name: 'choices', type: 'array', initialValue: '', label: 'Choices', inputField: RadioButtonChoice }],
  select: [{ name: 'items', type: 'array', initialValue: '', label: 'Choices', inputField: SelectChoice }],
};

const QuestionField: React.FC<InputFieldPropType> = (props: InputFieldPropType) => {
  const { value, name } = props;
  const showHelp: boolean = value?.showHelp && value.showHelp === true;
  const extraInput = Object.keys(extraInputs).includes(value.type) && extraInputs[value.type as InputType];
  return (
    <>
      <h3>General</h3>
      <MultipleInputField fields={questionFields} {...props} />
      {showHelp && (
        <>
          <h3>Help</h3>
          <HelpField name={`${name}.help`} value={value} />
        </>
      )}
      <h3>Specifics</h3>
      <QuestionTypeSelect name={name} value={value} label="Input Type" choices={typeChoices} />
      {extraInput && <MultipleInputField fields={extraInput} {...props} />}
    </>
  );
};

export default QuestionField;
