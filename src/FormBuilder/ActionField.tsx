import React from 'react';
import FieldDescriptor from '../types/FieldDescriptor';
import MultipleInputField from './MultipleInputField';

const actionFields: FieldDescriptor[] = [
  { name: "type", type:"select", initialValue:'next', label:"Type",
    choices: [ 
      {name:'Start', value:'start'},
      {name:'Next', value:'next'},
      {name:'Submit',value:'submit'},
    ]},
  { name: "label", type:"text", initialValue:'', label:"Label" },
]

const ActionField: React.FC<any> = props => {
  return <MultipleInputField fields={actionFields} {...props} />
}

export default ActionField;