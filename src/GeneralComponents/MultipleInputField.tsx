import React, { useContext } from 'react';
import CSS from 'csstype';
import { TextField, Select, MenuItem, Checkbox, FormGroup, FormControlLabel } from '@material-ui/core';
import FieldDescriptor from '../types/FieldDescriptor';
import FieldArrayWrapper from './FieldArrayWrapper';
import FormContext from '../Contexts/FormContext';
import { MultipleInputFieldPropType } from '../types/PropTypes';

const inputFieldStyle: CSS.Properties = {
  marginLeft: '7px',
  marginTop: '5px',
};

const MultipleInputField: React.FC<MultipleInputFieldPropType> = ({
  onChange,
  onBlur,
  name,
  value,
  fields,
  ...other
}) => {
  const { forms } = useContext(FormContext);

  const inputComponent = (field: FieldDescriptor, computedName: string) => {
    switch (field.type) {
      case 'text':
        return (
          <TextField
            fullWidth
            multiline
            rowsMax={3}
            name={computedName}
            onChange={onChange}
            onBlur={onBlur}
            value={field && value && field.name && value[field.name] ? value[field.name] : field.initialValue}
            label={field.label}
            {...other}
          />
        );
      case 'select':
        return (
          <FormGroup style={inputFieldStyle} row>
            <div style={{ paddingTop: '5px', marginRight: '10px' }}>{field.label} </div>
            <Select name={computedName} onChange={onChange} onBlur={onBlur} value={value[field.name]} {...other}>
              {field.choices
                ? field.choices.map((choice) => (
                    <MenuItem key={choice.name} value={choice.value}>
                      {choice.name}
                    </MenuItem>
                  ))
                : null}
            </Select>
          </FormGroup>
        );
      case 'checkbox':
        return (
          <FormGroup style={inputFieldStyle} row>
            <FormControlLabel
              control={
                <Checkbox
                  checked={field.name && value[field.name] ? value[field.name] : false}
                  onChange={onChange}
                  name={computedName}
                />
              }
              label={field.label}
            />
          </FormGroup>
        );
      case 'array':
        return (
          <FieldArrayWrapper
            heading={field.label}
            parentName={name}
            name={field.name}
            value={value}
            inputField={field.inputField ? field.inputField : null}
            emptyObject={{}}
            color="green"
          />
        );
      case 'formSelect':
        return (
          <FormGroup style={inputFieldStyle} row>
            <div style={{ paddingTop: '5px', marginRight: '10px' }}>{field.label} </div>
            <Select name={computedName} onChange={onChange} onBlur={onBlur} value={value[field.name]} {...other}>
              {forms
                ? forms
                    .filter((f) => f.subform)
                    .map((form) => (
                      <MenuItem key={form.id} value={form.id}>
                        {form.name}
                      </MenuItem>
                    ))
                : null}
            </Select>
          </FormGroup>
        );
      default:
        return (
          <TextField
            name={computedName}
            onChange={onChange}
            onBlur={onBlur}
            value={value[field.name]}
            label={field.label}
            {...other}
          />
        );
    }
  };

  return (
    <FormGroup>
      {fields.map((field) => {
        const computedName = !name || name === '' ? field.name : name + '.' + field.name;
        return (
          <div key={computedName} style={inputFieldStyle}>
            {inputComponent(field, computedName)}
          </div>
        );
      })}
    </FormGroup>
  );
};

export default MultipleInputField;
