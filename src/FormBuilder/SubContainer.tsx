import React, {useState} from 'react';
import CSS from 'csstype';
import { Field } from 'formik';
import { Button } from '@material-ui/core';
import QuestionField from './QuestionField';

const containerStyle: CSS.Properties = {
  backgroundColor: 'rgba(255, 255, 255, 0.85)',
  borderWidth:'1px',
  borderStyle:'solid',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
  padding:'3px',
  marginLeft: '15px',
  marginRight: '15px',
  marginTop:'5px',
  position:'relative',
  minHeight:'43px'
};

const SubContainer: React.FC<any> = ({ itemValues, name, currentIndex, inputField, arrayHelpers, color}) => {
  const [collapsed, setCollapsed]= useState(true);
    if(!collapsed) { 
      return (
        <div style={{borderColor: (color? color : 'red'), ...containerStyle}} key={name}> 
          <Field 
            name={name}
            type="input" as={inputField}/>
  
          <div style={{display:'block', textAlign:'right'}}>
            { currentIndex > 0 ?
              <Button 
                style={{margin:'5px'}}
                variant="contained"
                color="primary" 
                onClick={() => arrayHelpers.swap(currentIndex, currentIndex-1)}>^</Button>
                : null
            }
            <Button 
              style={{margin:'5px'}}
              variant="contained"
              color="default"
              onClick={() => setCollapsed(true)}>Collapse</Button>
            <Button 
              variant="contained" 
              color="secondary" 
              onClick={() => arrayHelpers.remove(currentIndex)}>X</Button>
            </div>
        </div>);
      } 

    const containerName = itemValues.label && itemValues.label !=='' ? itemValues.label : 
      (itemValues.description && itemValues.description !== '' ? itemValues.description : 'Unnamed'); 

    return (
        <div key={currentIndex}>
            <h4 style={{borderColor: (color? color : 'red'), ...containerStyle}}>{currentIndex+1}. {containerName}
                <div style={{display:'inline', position:'absolute', right:'0px'}}>
                { currentIndex > 0 ?
                    <Button 
                        style={{margin:'5px'}}
                        variant="contained"
                        color="primary"
                        onClick={() => arrayHelpers.swap(currentIndex, currentIndex-1)}>^</Button>
                    : null
                }
                
                <Button 
                    style={{margin:'5px'}}
                    variant="contained"
                    color="default"
                    onClick={() => setCollapsed(false)}>Show</Button>
                <Button 
                    style={{margin:'5px'}}
                    variant="contained"
                    color="secondary"
                    onClick={() => arrayHelpers.remove(currentIndex)}>X</Button>
                </div>
            </h4>
      </div>);
  }
  
  export default SubContainer;