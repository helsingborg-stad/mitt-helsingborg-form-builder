import React from 'react';
import FieldDescriptor from '../../../types/FieldDescriptor';
import MultipleInputField from '../../general/MultipleInputField';
import EditableListInputField from './EditableListInputField';
import NavigationButton from './NavigationButton/NavigationButtonField';
import { InputFieldPropType } from '../../../types/PropTypes';
import NavigationButtonField from './NavigationButton/NavigationButtonField';
import SummaryListItemField from './SummaryList/SummaryListItemField';
import RepeaterInputField from './RepeaterInputField';
import CategoryField from './SummaryList/CategoryField';

const questionFields: FieldDescriptor[] = [
  { name: 'label', type: 'text', initialValue: '', label: 'Label' },
  { name: 'labelHelp', type: 'text', initialValue: '', label: 'Helper' },
  { name: 'description', type: 'text', initialValue: '', label: 'Description' },
  { name: 'id', type: 'text', initialValue: '', label: 'Id' },
  { name: 'conditionalOn', type: 'text', initialValue: '', label: 'Conditional on (field id)' },
  {
    name: 'type',
    type: 'select',
    initialValue: 'text',
    label: 'Type',
    choices: [
      { name: 'Text', value: 'text' },
      { name: 'Number', value: 'number' },
      { name: 'Date', value: 'date' },
      { name: 'Editable List', value: 'editableList' },
      { name: 'Checkbox', value: 'checkbox' },
      { name: 'Button', value: 'button' },
      { name: 'Avatar List (family members)', value: 'avatarList' },
      { name: 'Navigation button', value: 'navigationButton' },
      { name: 'Navigation button group', value: 'navigationButtonGroup' },
      { name: 'Summary List', value: 'summaryList' },
      { name: 'Repeater Field', value: 'repeaterField' },
    ],
  },
];

const extraInputs: Record<string, FieldDescriptor[]> = {
  text: [
    { name: 'placeholder', type: 'text', initialValue: '', label: 'Placeholder' },
    { name: 'loadPrevious', type: 'loadPreviousToggle', initialValue: '', label: 'Load data from previous case?' },
  ],
  number: [
    { name: 'placeholder', type: 'text', initialValue: '', label: 'Placeholder' },
    { name: 'loadPrevious', type: 'loadPreviousToggle', initialValue: '', label: 'Load data from previous case?' },
  ],
  editableList: [
    { name: 'placeholder', type: 'text', initialValue: '', label: 'Placeholder' },
    { name: 'title', type: 'text', initialValue: '', label: 'Title' },
    { name: 'inputs', type: 'array', initialValue: '', label: 'Inputs', inputField: EditableListInputField },
  ],
  checkbox: [
    { name: 'text', type: 'text', initialValue: '', label: 'Text' },
    { name: 'color', type: 'text', initialValue: 'light', label: 'Color' },
    { name: 'inputHelp', type: 'text', initialValue: '', label: 'Value helper' },
    { name: 'loadPrevious', type: 'loadPreviousToggle', initialValue: '', label: 'Load data from previous case?' },
  ],
  avatarList: [
    { name: 'heading', type: 'text', initialValue: '', label: 'Title' },
    { name: 'formId', type: 'formSelect', initialValue: '', label: 'Subform' },
  ],
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
  const { value } = props;
  const extraInput = Object.keys(extraInputs).includes(value.type) && extraInputs[value.type];
  return (
    <>
      <MultipleInputField fields={questionFields} {...props} />
      {extraInput ? <MultipleInputField fields={extraInput} {...props} /> : null}
    </>
  );
};

export default QuestionField;
