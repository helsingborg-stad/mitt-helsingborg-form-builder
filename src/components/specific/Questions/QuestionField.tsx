import React from 'react';
import FieldDescriptor from '../../../types/FieldDescriptor';
import MultipleInputField from '../../general/MultipleInputField';
import EditableListInputField from './EditableListInputField';
import SubstepListCategoryField from './SubstepList/SubstepListCategoryField';
import SubstepListItemField from './SubstepList/SubstepListItemField';
import { InputFieldPropType } from '../../../types/PropTypes';

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
      { name: 'Editable List', value: 'editableList' },
      { name: 'Checkbox', value: 'checkbox' },
      { name: 'Button', value: 'button' },
      { name: 'Substep List', value: 'substepList' },
    ],
  },
];

const extraInputs: Record<string, FieldDescriptor[]> = {
  text: [ 
    { name: 'placeholder', type: 'text', initialValue: '', label: 'Placeholder' }, 
    { name: 'loadPrevious', type: 'loadPreviousToggle', initialValue:'', label:'Load data from previous case?'}
  ],
  number: [
    { name: 'placeholder', type: 'text', initialValue: '', label: 'Placeholder' }, 
    { name: 'loadPrevious', type: 'loadPreviousToggle', initialValue:'', label:'Load data from previous case?'}
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
    { name: 'loadPrevious', type: 'loadPreviousToggle', initialValue:'', label:'Load data from previous case?'},
  ],
  button: [{ name: 'text', type: 'text', initialValue: '', label: 'Button Text' }],
  substepList: [
    { name: 'heading', type: 'text', initialValue: '', label: 'Heading' },
    { name: 'color', type: 'text', initialValue: 'light', label: 'Color theme' },
    { name: 'categories', type: 'array', initialValue: '', label: 'Categories', inputField: SubstepListCategoryField },
    { name: 'items', type: 'array', initialValue: '', label: 'Items', inputField: SubstepListItemField },
  ],
};

const QuestionField: React.FC<InputFieldPropType> = (props) => {
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
