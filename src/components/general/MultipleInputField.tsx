import React, { useContext } from 'react';
import CSS from 'csstype';
import { TextField, Select, MenuItem, Checkbox, FormGroup, FormControlLabel } from '@material-ui/core';
import ColorPicker from 'material-ui-color-picker';
import FieldDescriptor from '../../types/FieldDescriptor';
import FieldArrayWrapper from './FieldArrayWrapper';
import FormContext from '../../contexts/FormContext';
import { MultipleInputFieldPropType } from '../../types/PropTypes';
import LoadPreviousToggle from './LoadPreviousToggle';
import { Form } from '../../types/FormTypes';
import { OptionLevel } from '../../types/FieldDescriptor';

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
  setFieldValue,
  ...other
}: MultipleInputFieldPropType) => {
  const { forms, optionLevel } = useContext(FormContext);

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
            <Select
              name={computedName}
              onChange={onChange}
              onBlur={onBlur}
              value={value[field.name] || field.initialValue}
              {...other}
            >
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
      case 'loadPreviousToggle':
        return (
          <LoadPreviousToggle
            name={computedName}
            label={field.label}
            value={value || field.initialValue}
            setFieldValue={setFieldValue}
          />
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
        if (field.inputField) {
          return (
            <FieldArrayWrapper
              heading={field.label}
              parentName={name}
              name={field.name}
              value={value}
              inputField={field.inputField}
              emptyObject={{}}
              color="green"
              setFieldValue={setFieldValue}
            />
          );
        }
        break;
      case 'formSelect':
        return (
          <FormGroup style={inputFieldStyle} row>
            <div style={{ paddingTop: '5px', marginRight: '10px' }}>{field.label} </div>
            <Select name={computedName} onChange={onChange} onBlur={onBlur} value={value[field.name]} {...other}>
              {forms
                ? forms
                    .filter((f: Form) => f.subform)
                    .map((form: Form) => (
                      <MenuItem key={form.id} value={form.id}>
                        {form.name}
                      </MenuItem>
                    ))
                : null}
            </Select>
          </FormGroup>
        );
      case 'colorPicker':
        return (
          <FormGroup style={inputFieldStyle} row>
            <div style={{ paddingTop: '18px', marginRight: '8px' }}>{field.label} </div>
            <ColorPicker
              name={computedName}
              onChange={(color: string) => {
                if (setFieldValue) {
                  setFieldValue(computedName, color);
                }
              }}
              disabled
              value={field && value && field.name && value[field.name] ? value[field.name] : field.initialValue}
              hintText=""
              style={{
                backgroundColor: value[field.name],
                border: '1px solid white',
                borderRadius: '4px',
              }}
            />
            <p style={{ paddingTop: '0px', marginLeft: '10px' }}>
              {field && value && field.name && value[field.name] ? value[field.name] : field.initialValue}
            </p>
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
      {fields
        .filter((field) => field.optionLevel <= optionLevel)
        .map((field) => {
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
