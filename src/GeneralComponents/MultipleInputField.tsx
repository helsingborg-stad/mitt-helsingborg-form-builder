import React from 'react';
import { TextField, Select, MenuItem, Checkbox, FormGroup, FormControlLabel } from '@material-ui/core';
import FieldDescriptor from '../types/FieldDescriptor';

interface Props  {
    name: string;
    onBlur: (e?: any) => void;
    value: Record<string, any>;
    fields: FieldDescriptor[] ;
    onChange: (e?: any) => void;
  }
  
  const MultipleInputField: React.FC<Props> = ({ onChange, onBlur, name, value, fields, ...other}) => {
    return (
    <div>
        { fields.map( field => {

          const computedName = (!name || name ==='') ? field.name : name + '.'+field.name;
            
            switch(field.type){
                    case 'text':
                         return (
                            <div style={{marginLeft:'7px', marginTop:'5px'}}>
                              <TextField
                                  name={computedName}
                                  onChange={onChange}
                                  onBlur={onBlur}
                                  value={value[field.name]}
                                  label={field.label}
                                  {...other}
                              />
                            </div>);
                    case 'select':
                        return (
                            <div style={{marginLeft:'7px', marginTop:'5px'}}>
                              <Select
                                  name={computedName}
                                  onChange={onChange}
                                  onBlur={onBlur}
                                  value={value[field.name]}
                                  label={field.label}
                                  {...other}
                              >
                                {field.choices ? field.choices.map( choice => (
                                    <MenuItem value={choice.value}>{choice.name}</MenuItem>
                                )) : null}
                              </Select>
                            </div>
                          ); 
                    case 'checkbox':
                      return (
                        <FormGroup row>
                          <FormControlLabel
                            control={
                            <Checkbox 
                              checked={ field.name && value[field.name] ? value[field.name] : false} 
                              onChange={onChange} 
                              name={computedName} />}
                            label={field.label}
                          />
                        </FormGroup>
                        );   
                    default:
                         return (
                            <div style={{marginLeft:'7px', marginTop:'5px'}}>
                              <TextField
                                  name={computedName}
                                  onChange={onChange}
                                  onBlur={onBlur}
                                  value={value[field.name]}
                                  label={field.label}
                                  {...other}
                              />
                            </div>
                          );
                }
            
            
        })}
    </div>
  )
}

export default MultipleInputField;