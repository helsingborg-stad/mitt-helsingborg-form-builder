import React from 'react';
import FieldDescriptor from '../../../types/FieldDescriptor';
import MultipleInputField from '../../general/MultipleInputField';
import { InputFieldPropType } from '../../../types/PropTypes';

const fields: FieldDescriptor[] = [
  { name: 'title', type: 'text', initialValue: '', label: 'Title' },
  { name: 'id', type: 'text', initialValue: '', label: 'Field id' },
  { name: 'tags', type: 'tags', initialValue: '', label: 'Tags (enter as comma-separated list of words)' },
  {
    name: 'type',
    type: 'select',
    initialValue: '',
    label: 'Field type',
    choices: [
      { name: 'Text', value: 'text' },
      { name: 'Number', value: 'number' },
      { name: 'Date', value: 'date' },
    ],
  },
];

const RepeaterInputField: React.FC<InputFieldPropType> = (props: InputFieldPropType) => {
  return <MultipleInputField fields={fields} {...props} />;
};

export default RepeaterInputField;
