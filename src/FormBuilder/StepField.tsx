import React from 'react';
import { TextField } from '@material-ui/core';
import { FieldArray } from 'formik';
import { Button } from '@material-ui/core';
import QuestionField from './QuestionField';
import FieldArrayWrapper from './FieldArrayWrapper';
import SubContainer from './SubContainer';
import FieldDescriptor from '../types/FieldDescriptor';
import ActionField from './ActionField';

const stepFields: FieldDescriptor[] = [
  { name: "title", type:"text", initialValue:'',label:"Title" },
  { name: "icon", type:"text", initialValue:'',label:"Icon" },
  { name: "description", type:"text", initialValue:'',label:"Description" },
  { name: "group", type:"text", initialValue:'',label:"Group" },
  { name: "id", type:"text", initialValue:'',label:"Id" },
]

const StepField: React.FC<any> = ({ onChange, onBlur, name, value, ...other}) => {
  return (
    <div>
        { stepFields.map( qs => {
            return (
              <div>
                <TextField
                    width={1}
                    name={name ? name + "." + qs.name : qs.name}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value[qs.name]}
                    placeholder={qs.placeholder ? qs.placeholder: ''}
                    label={qs.label}
                    key={name + "." + qs.name}
                    {...other}
                />
              </div>
            )
        })}
        <FieldArrayWrapper 
          heading="Questions" 
          parentName={name}
          name="questions"
          value={value}
          inputField={QuestionField}
          emptyObject={{
            label:'', description:'', type:'',
            id:""}}
        />

        <FieldArrayWrapper 
          heading="Actions" 
          parentName={name}
          name="actions"
          value={value}
          inputField={ActionField}
          emptyObject={{ label:'', type:'' }}
          color="green"
        />

    </div>
  )
}

export default StepField;
