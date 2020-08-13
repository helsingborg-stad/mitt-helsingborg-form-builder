import React from 'react';
import FieldDescriptor from '../types/FieldDescriptor';
import MultipleInputField from '../GeneralComponents/MultipleInputField';

const questionFields: FieldDescriptor[] = [
  { name: "label", type:"text", initialValue:'',label:"Label" },
  { name: "description", type:"text", initialValue:'',label:"Description" },
  { name: "id", type:"text", initialValue:'',label:"Id" },
  { name: "type", type:"select", initialValue:'text',label:"Type", 
    choices: [ 
      {name:'Text', value:'text'},
      {name:'Number', value:'number'},
      {name:'Editable List',value:'editableList'},
      {name:'Checkbox',value:'checkbox'},
      {name:'Button',value:'button'},
    ]},
]

const extraInputs: Record<string,FieldDescriptor[]> = {
  text: [
    { name: 'placeholder', type:'text', initialValue:'', label:'Placeholder'}
  ],
  number: [
    { name: 'placeholder', type:'text', initialValue:'', label:'Placeholder'}
  ],
  editableList: [
    { name: 'placeholder', type:'text', initialValue:'', label:'Placeholder'},
    { name: 'title', type:'text', initialValue:'', label:'Title'},
    { name: 'inputs', type: 'text', initialValue:'', label:'Inputs'},
  ],
  checkbox: [
    { name: 'text', type:'text', initialValue:'', label:'Text'},
    { name: 'color', type:'text', initialValue:'light', label:'Color'},
  ],
  button: [
    { name: 'text', type:'text', initialValue:'', label:'Button Text'}
  ],
}

interface Props  {
  name: string;
  value: Record<string, any>;
  type: string;
  onBlur: (e?: any) => void;
  onChange: (e?: any) => void;
}

const QuestionField: React.FC<Props> = props => {
  const {value} = props;
  const extraInput = Object.keys(extraInputs).includes(value.type) ? extraInputs[value.type] : null;
  return (
    <> 
      <MultipleInputField fields={questionFields} {...props} />
      { extraInput ? <MultipleInputField fields={extraInput} {...props} /> : null }
    </>
  )
}

export default QuestionField;