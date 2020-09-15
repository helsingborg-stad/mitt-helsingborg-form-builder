import React from 'react';
import FieldDescriptor, { OptionLevel } from '../../../types/FieldDescriptor';
import MultipleInputField from '../../general/MultipleInputField';
import EditableListInputField from './EditableListInputField';
import SubstepListCategoryField from './SubstepList/SubstepListCategoryField';
import SubstepListItemField from './SubstepList/SubstepListItemField';
import { InputFieldPropType } from '../../../types/PropTypes';

const questionFields: FieldDescriptor[] = [
  { name: 'label', type: 'text', initialValue: '', label: 'Label', optionLevel: OptionLevel.Basic },
  { name: 'labelHelp', type: 'text', initialValue: '', label: 'Helper', optionLevel: OptionLevel.Intermediate },
  { name: 'description', type: 'text', initialValue: '', label: 'Description', optionLevel: OptionLevel.Basic },
  { name: 'id', type: 'text', initialValue: '', label: 'Id', optionLevel: OptionLevel.Advanced },
  {
    name: 'conditionalOn',
    type: 'text',
    initialValue: '',
    label: 'Conditional on (field id)',
    optionLevel: OptionLevel.Advanced,
  },
  {
    name: 'type',
    type: 'select',
    initialValue: 'text',
    label: 'Type',
    choices: [
      { name: 'Text', value: 'text' },
      { name: 'Number', value: 'number' },
      { name: 'Editable List', value: 'editableList' },
      { name: 'Checkbox', value: 'checkbox' },
      { name: 'Button', value: 'button' },
      { name: 'Substep List', value: 'substepList' },
      { name: 'Substep List Summary', value: 'substepListSummary' },
      { name: 'Avatar List (family members)', value: 'avatarList' },
    ],
    optionLevel: OptionLevel.Basic,
  },
];

const extraInputs: Record<string, FieldDescriptor[]> = {
  text: [
    {
      name: 'placeholder',
      type: 'text',
      initialValue: '',
      label: 'Placeholder',
      optionLevel: OptionLevel.Intermediate,
    },
    {
      name: 'loadPrevious',
      type: 'loadPreviousToggle',
      initialValue: '',
      label: 'Load data from previous case?',
      optionLevel: OptionLevel.Advanced,
    },
  ],
  number: [
    {
      name: 'placeholder',
      type: 'text',
      initialValue: '',
      label: 'Placeholder',
      optionLevel: OptionLevel.Intermediate,
    },
    {
      name: 'loadPrevious',
      type: 'loadPreviousToggle',
      initialValue: '',
      label: 'Load data from previous case?',
      optionLevel: OptionLevel.Advanced,
    },
  ],
  editableList: [
    {
      name: 'placeholder',
      type: 'text',
      initialValue: '',
      label: 'Placeholder',
      optionLevel: OptionLevel.Intermediate,
    },
    { name: 'title', type: 'text', initialValue: '', label: 'Title', optionLevel: OptionLevel.Basic },
    {
      name: 'inputs',
      type: 'array',
      initialValue: '',
      label: 'Inputs',
      inputField: EditableListInputField,
      optionLevel: OptionLevel.Basic,
    },
  ],
  checkbox: [
    { name: 'text', type: 'text', initialValue: '', label: 'Text', optionLevel: OptionLevel.Basic },
    { name: 'color', type: 'text', initialValue: 'light', label: 'Color', optionLevel: OptionLevel.Basic },
    { name: 'inputHelp', type: 'text', initialValue: '', label: 'Value helper', optionLevel: OptionLevel.Intermediate },
    {
      name: 'loadPrevious',
      type: 'loadPreviousToggle',
      initialValue: '',
      label: 'Load data from previous case?',
      optionLevel: OptionLevel.Advanced,
    },
  ],
  button: [{ name: 'text', type: 'text', initialValue: '', label: 'Button Text', optionLevel: OptionLevel.Basic }],
  substepList: [
    { name: 'heading', type: 'text', initialValue: '', label: 'Heading', optionLevel: OptionLevel.Basic },
    { name: 'color', type: 'text', initialValue: 'light', label: 'Color theme', optionLevel: OptionLevel.Basic },
    {
      name: 'categories',
      type: 'array',
      initialValue: '',
      label: 'Categories',
      inputField: SubstepListCategoryField,
      optionLevel: OptionLevel.Basic,
    },
    {
      name: 'items',
      type: 'array',
      initialValue: '',
      label: 'Items',
      inputField: SubstepListItemField,
      optionLevel: OptionLevel.Basic,
    },
  ],
  substepListSummary: [
    { name: 'heading', type: 'text', initialValue: '', label: 'Heading', optionLevel: OptionLevel.Basic },
    { name: 'color', type: 'text', initialValue: 'light', label: 'Color theme', optionLevel: OptionLevel.Basic },
    {
      name: 'categories',
      type: 'array',
      initialValue: '',
      label: 'Categories',
      inputField: SubstepListCategoryField,
      optionLevel: OptionLevel.Basic,
    },
    {
      name: 'items',
      type: 'array',
      initialValue: '',
      label: 'Items',
      inputField: SubstepListItemField,
      optionLevel: OptionLevel.Basic,
    },
  ],
  avatarList: [
    { name: 'heading', type: 'text', initialValue: '', label: 'Title', optionLevel: OptionLevel.Basic },
    { name: 'formId', type: 'formSelect', initialValue: '', label: 'Subform', optionLevel: OptionLevel.Basic },
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
