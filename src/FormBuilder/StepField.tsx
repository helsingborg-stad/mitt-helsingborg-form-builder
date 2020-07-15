import React from 'react';
import { TextField } from '@material-ui/core';
import { FieldArray } from 'formik';
import { Button } from '@material-ui/core';
import QuestionField from './QuestionField';
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
                    name={name + "." + qs.name}
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
        <h3>Questions</h3>
        <FieldArray name={`${name}.questions`}>
          {(arrayHelpers) => { return (
          <div>
            {value.questions && value.questions.length > 0 ? 
              value.questions.map( 
                (qs: any, i: number) => { 
                  const qName = `${name}.questions.${i}`
                  return <SubContainer 
                            itemValues={qs} 
                            name={qName} 
                            currentIndex={i}
                            inputField={QuestionField} 
                            arrayHelpers={arrayHelpers} />
                }) 
              :
              <div style={{margin:'5px'}}>No questions added</div>
          }
            <Button
              style={{margin:'5px'}}
              variant="contained"
              color="primary"
              onClick={() => 
                arrayHelpers.push({
                  label:'', description:'', type:'',
                  id:""+Math.random()
                })}>Add question</Button>
          </div>)
          }}
        </FieldArray>

        <h3>Actions</h3>
        <FieldArray name={`${name}.actions`}>
          {(arrayHelpers) => { return (
          <div>
            {value.actions && value.actions.length > 0 ? 
              value.actions.map( 
                (action: any, i: number) => { 
                  const aName = `${name}.actions.${i}`
                  return <SubContainer 
                            itemValues={action} 
                            name={aName} 
                            currentIndex={i}
                            inputField={ActionField} 
                            arrayHelpers={arrayHelpers}
                            color="green" />
                }) 
              :
              <div style={{margin:'5px'}}>No actions added</div>
          }
            <Button
              style={{margin:'5px'}}
              variant="contained"
              color="primary"
              onClick={() => 
                arrayHelpers.push({ label:'',  type:''})}>Add action</Button>
          </div>)
          }}
        </FieldArray>
    </div>
  )
}

export default StepField;
