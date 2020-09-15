import React from 'react';
import FieldDescriptor, { OptionLevel } from '../../../types/FieldDescriptor';
import MultipleInputField from '../../general/MultipleInputField';
import { InputFieldPropType } from '../../../types/PropTypes';

const editableListFields: FieldDescriptor[] = [
  {
    name: 'type',
    type: 'select',
    initialValue: 'text',
    label: 'Type',
    choices: [
      { name: 'Text', value: 'text' },
      { name: 'Number', value: 'number' },
    ],
    optionLevel: OptionLevel.Basic,
  },
  { name: 'label', type: 'text', initialValue: '', label: 'Label', optionLevel: OptionLevel.Basic },
  { name: 'key', type: 'text', initialValue: '', label: 'Key', optionLevel: OptionLevel.Advanced },
  {
    name: 'loadPrevious',
    type: 'loadPreviousToggle',
    initialValue: '',
    label: 'Load data from previous case?',
    optionLevel: OptionLevel.Advanced,
  },
];

const EditableListInputField: React.FC<InputFieldPropType> = (props: InputFieldPropType) => {
  return <MultipleInputField fields={editableListFields} {...props} />;
};

export default EditableListInputField;
