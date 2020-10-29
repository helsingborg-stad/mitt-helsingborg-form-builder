import React from 'react';
import FieldDescriptor, { InputType } from '../../../types/FieldDescriptor';
import MultipleInputField from '../../general/MultipleInputField';
import EditableListInputField from './EditableListInputField';
import { InputFieldPropType } from '../../../types/PropTypes';
import NavigationButtonField from './NavigationButton/NavigationButtonField';
import SummaryListItemField from './SummaryList/SummaryListItemField';
import RepeaterInputField from './RepeaterInputField';
import CategoryField from './SummaryList/CategoryField';
import QuestionTypeSelect from './QuestionTypeSelect';

const questionFields: FieldDescriptor[] = [
  { name: 'label', type: 'text', initialValue: '', label: 'Label' },
  { name: 'labelHelp', type: 'text', initialValue: '', label: 'Helper' },
  { name: 'description', type: 'text', initialValue: '', label: 'Description' },
  { name: 'id', type: 'text', initialValue: '', label: 'Id' },
  { name: 'conditionalOn', type: 'text', initialValue: '', label: 'Conditional on (field id)' },
];

const typeChoices: { displayName: string; selectValue: string; inputType: InputType; validationType?: string }[] = [
  { selectValue: 'text', displayName: 'Text', inputType: 'text', validationType: 'text' },
  { selectValue: 'email', displayName: 'Email', inputType: 'text', validationType: 'email' },
  { selectValue: 'postalCode', displayName: 'Postnummer', inputType: 'number', validationType: 'postalcode' },
  { selectValue: 'personalNumber', displayName: 'Personnummer', inputType: 'number', validationType: 'personalNumber' },
  { selectValue: 'phone', displayName: 'Telefonnummer', inputType: 'number', validationType: 'phonenumber' },
  { selectValue: 'number', displayName: 'Number', inputType: 'number', validationType: 'number' },
  { selectValue: 'date', displayName: 'Date', inputType: 'date' },
  { selectValue: 'editableList', displayName: 'Editable List', inputType: 'editableList' },
  { selectValue: 'checkbox', displayName: 'Checkbox', inputType: 'checkbox' },
  { selectValue: 'avatarList', displayName: 'Avatar List (family members)', inputType: 'avatarList' },
  { selectValue: 'navigationButton', displayName: 'Navigation button', inputType: 'navigationButton' },
  { selectValue: 'navigationButtonGroup', displayName: 'Navigation button group', inputType: 'navigationButtonGroup' },
  { selectValue: 'summaryList', displayName: 'Summary List', inputType: 'summaryList' },
  { selectValue: 'repeaterField', displayName: 'Repeater Field', inputType: 'repeaterField' },
];

const extraInputs: Record<string, FieldDescriptor[]> = {
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
    { name: 'placeholder', type: 'text', initialValue: '', label: 'Placeholder' },
    { name: 'title', type: 'text', initialValue: '', label: 'Title' },
    { name: 'inputs', type: 'array', initialValue: '', label: 'Inputs', inputField: EditableListInputField },
  ],
  checkbox: [
    { name: 'text', type: 'text', initialValue: '', label: 'Text' },
    { name: 'color', type: 'text', initialValue: 'light', label: 'Color' },
    { name: 'inputHelp', type: 'text', initialValue: '', label: 'Value helper' },
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
};

const QuestionField: React.FC<InputFieldPropType> = (props: InputFieldPropType) => {
  const { value, name, setFieldValue } = props;
  const extraInput = Object.keys(extraInputs).includes(value.type) && extraInputs[value.type];
  return (
    <>
      <MultipleInputField fields={questionFields} {...props} />
      <QuestionTypeSelect
        name={name}
        value={value}
        initialValue={'text'}
        label="Input Type"
        choices={typeChoices}
        setFieldValue={setFieldValue}
      />
      {extraInput && <MultipleInputField fields={extraInput} {...props} />}
    </>
  );
};

export default QuestionField;
