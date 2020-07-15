import React from 'react';
import FieldDescriptor from '../types/FieldDescriptor';
import MultipleInputField from './MultipleInputField';

const actionFields: FieldDescriptor[] = [
  { name: "type", type:"text", initialValue:'next', label:"Type" },
  { name: "label", type:"text", initialValue:'', label:"Label" },
]

const ActionField: React.FC<any> = props => {
  return <MultipleInputField fields={actionFields} {...props} />
}

export default ActionField;