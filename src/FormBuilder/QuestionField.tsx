import React from 'react';
import FieldDescriptor from '../types/FieldDescriptor';
import MultipleInputField from './MultipleInputField';

const questionFields: FieldDescriptor[] = [
  { name: "label", type:"text", initialValue:'',label:"Label" },
  { name: "description", type:"text", initialValue:'',label:"Description" },
  { name: "id", type:"text", initialValue:'',label:"Id" },
  { name: "type", type:"text", initialValue:'',label:"Type" },
]

const QuestionField: React.FC<any> = props => {
  return <MultipleInputField fields={questionFields} {...props} />
}

export default QuestionField;