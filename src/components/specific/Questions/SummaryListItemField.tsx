import React from 'react';
import FieldDescriptor from '../../../types/FieldDescriptor';
import MultipleInputField from '../../general/MultipleInputField';
import { InputFieldPropType } from '../../../types/PropTypes';

const fields: FieldDescriptor[] = [
  { name: 'title', type: 'text', initialValue: '', label: 'Title' },
  { name: 'id', type: 'text', initialValue: '', label: 'Field id' },
  { name: 'category', type: 'text', initialValue: '', label: 'Category' },
  {
    name: 'type',
    type: 'select',
    initialValue: '',
    label: 'Field type',
    choices: [
      { name: 'Text', value: 'text' },
      { name: 'Number', value: 'number' },
      { name: 'Date', value: 'date' },
      { name: 'Checkbox', value: 'checkbox' },
    ],
  },
];

const SummaryListItemField: React.FC<InputFieldPropType> = (props: InputFieldPropType) => {
  return <MultipleInputField fields={fields} {...props} />;
};

export default SummaryListItemField;
