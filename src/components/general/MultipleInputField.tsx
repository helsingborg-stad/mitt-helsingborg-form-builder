import React, { useEffect } from 'react';
import { FastField } from 'formik';
import CSS from 'csstype';
import { Select, MenuItem, Checkbox, FormGroup, FormControlLabel } from '@material-ui/core';
import ColorPicker from 'material-ui-color-picker';
import FieldDescriptor from '../../types/FieldDescriptor';
import FieldArrayWrapper from './FieldArrayWrapper';
import { MultipleInputFieldPropType } from '../../types/PropTypes';
import LoadPreviousToggle from './SmartInputs/LoadPreviousToggle';
import NavigationButtonInput from '../specific/Questions/InputTypes/NavigationButton/NavigationButtonInput';
import InputFieldSelect from './SmartInputs/InputFieldSelect';
import TagsInput from './SmartInputs/TagsInput';
import TextFieldWrapper from './TextFieldWrapper';
import { useFormikContext } from 'formik';
import { Form } from '../../types/FormTypes';

const inputFieldStyle: CSS.Properties = {
  marginLeft: '7px',
  marginTop: '5px',
};

const MultipleInputField: React.FC<MultipleInputFieldPropType> = ({
  name,
  value,
  fields,
  validation,
}: MultipleInputFieldPropType) => {
  const { setFieldValue } = useFormikContext<Form>();
  useEffect(() => {
    if (validation) {
      const computedName = !name || name === '' ? 'validation' : name + '.validation';
      setFieldValue(computedName, validation);
    }
  }, [validation, setFieldValue, name]);

  const inputComponent = (field: FieldDescriptor, computedName: string) => {
    switch (field.type) {
      case 'text':
        return (
          <FastField
            name={computedName}
            as={TextFieldWrapper}
            {...{ fullWidth: true, multiline: true, rowsMax: 3, label: field.label }}
          />
        );
      case 'select':
        return (
          <FormGroup style={inputFieldStyle} row>
            <div style={{ paddingTop: '5px', marginRight: '10px' }}>{field.label} </div>
            <FastField as={Select} name={computedName}>
              {field.choices
                ? field.choices.map((choice) => (
                    <MenuItem key={choice.name} value={choice.value}>
                      {choice.name}
                    </MenuItem>
                  ))
                : null}
            </FastField>
          </FormGroup>
        );
      case 'loadPreviousToggle':
        return <LoadPreviousToggle name={computedName} label={field.label} value={value || field.initialValue} />;
      case 'navigationButton':
        return <NavigationButtonInput name={computedName} label={field.label} value={value || field.initialValue} />;
      case 'checkbox':
        return (
          <FormGroup style={inputFieldStyle} row>
            <FormControlLabel control={<FastField as={Checkbox} name={computedName} />} label={field.label} />
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
            />
          );
        }
        break;
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
      case 'questionIdPicker':
        return <InputFieldSelect name={computedName} label={field.label} />;
      case 'tags':
        return <TagsInput name={computedName} label={field.label} value={value[field.name] || field.initialValue} />;
      default:
        throw new Error(`Missing type ${field.type}`);
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
