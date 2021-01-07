import React from 'react';
import FieldDescriptor from '../../../types/FieldDescriptor';
import MultipleInputField from '../../general/MultipleInputField';
import { InputFieldPropType } from '../../../types/PropTypes';

const actionFields: FieldDescriptor[] = [
  {
    name: 'type',
    type: 'select',
    initialValue: '',
    label: 'Type',
    choices: [
      { name: 'Next', value: 'next' },
      { name: 'Submit', value: 'submit' },
      { name: 'Sign', value: 'sign' },
      { name: 'Close', value: 'close' },
      { name: 'Back to Main Form', value: 'backToMain' },
      { name: 'Back to Main Form and Next', value: 'backToMainAndNext' },
    ],
  },
  { name: 'label', type: 'text', initialValue: '', label: 'Label' },
  {
    name: 'color',
    type: 'select',
    initialValue: '',
    label: 'Button color',
    choices: [
      { value: 'blue', name: 'Blue' },
      { value: 'green', name: 'Green' },
      { value: 'red', name: ' Red' },
      { value: 'purple', name: 'Purple' },
      { value: 'neutral', name: 'Neutral (gray)' },
    ],
  },
  {
    name: 'hasCondition',
    type: 'checkbox',
    initialValue: '',
    label: 'Add condition to the action?',
    helpText: 'Make the action dependent on some condition, dependant on other field values.',
  },
];

const conditionInput: FieldDescriptor[] = [
  {
    name: 'conditionalOn',
    type: 'text',
    initialValue: '',
    label: 'Conditional on',
    helpText: `Make the action depend on values of another field. Most basic usage is to put a fieldId here, then the action is only allowed if that field is filled. Multiple fieldIds can also be entered, combining them with boolean logic operators ! (not), &&(and), || (or). For example 'field1 || field2' means that either field1 or field2 needs to be filled, while 'field1 && field2' means that both fields needs to have values, and so on. The order of operations is first !, then &&, finally ||. 
    
    For lists and repeaters, empty means "no values", while filled means "at least one non-empty value". `,
  },
];

const ActionField: React.FC<InputFieldPropType> = (props) => {
  const { value, name } = props;
  const hasCondition: boolean = value?.hasCondition && value.hasCondition === true;
  return (
    <>
      <MultipleInputField fields={actionFields} {...props} />
      {hasCondition && <MultipleInputField fields={conditionInput} {...props} />}
    </>
  );
};

export default ActionField;
