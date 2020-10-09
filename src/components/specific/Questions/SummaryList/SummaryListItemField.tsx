import React from 'react';
import FieldDescriptor from '../../../../types/FieldDescriptor';
import MultipleInputField from '../../../general/MultipleInputField';
import { InputFieldPropType } from '../../../../types/PropTypes';

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
      { name: 'ArrayText', value: 'arrayText' },
      { name: 'ArrayNumber', value: 'arrayNumber' },
      { name: 'ArrayDate', value: 'arrayDate' },
    ],
  },
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
      {extraInput ? <MultipleInputField fields={extraInput} {...props} /> : null}
    </>
  );
};

export default SummaryListItemField;
