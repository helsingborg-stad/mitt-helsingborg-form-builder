import React, {useState} from 'react';
import { FieldArray } from 'formik';
import CSS from 'csstype';
import { Field } from 'formik';
import { Button } from '@material-ui/core';
import QuestionField from './QuestionField';
import SubContainer from './SubContainer';

interface Props  {
    heading: string;
    value: Record<string, any>;
    parentName: string;
    name: string;
    emptyObject: Record<string, any>;
    inputField: React.FC<any>; 
    color?: string;
  }

const FieldArrayWrapper: React.FC<Props> = ({heading, parentName, 
    name, value, 
    inputField, emptyObject,
     color="red" }) => {

      return (
          <>
        <h3>{heading}</h3>
        <FieldArray name={`${parentName}.${name}`}>
          {(arrayHelpers) => { return (
          <div>
            {value[name] && value[name].length > 0 ? 
              value[name].map( 
                (qs: any, i: number) => { 
                  const qName = `${parentName}.${name}.${i}`
                  return <SubContainer 
                            itemValues={qs} 
                            name={qName} 
                            currentIndex={i}
                            inputField={inputField} 
                            arrayHelpers={arrayHelpers}
                            color={color} />
                }) 
              :
              <div style={{margin:'5px'}}>{`No ${name} added`}</div>
          }
            <Button
              style={{margin:'5px'}}
              variant="contained"
              color="primary"
              onClick={() => {
                  const newObject = {};
                  Object.assign(newObject, emptyObject);
                  arrayHelpers.push(newObject);
              }}>Add question</Button>
          </div>)
          }}
        </FieldArray>
        </>);
  }
  
  export default FieldArrayWrapper;

