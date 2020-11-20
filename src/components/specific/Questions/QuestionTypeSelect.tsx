import React, { useEffect, useState } from 'react';
import CSS from 'csstype';
import { Select, MenuItem, FormGroup, Switch } from '@material-ui/core';
import { InputType } from '../../../types/FieldDescriptor';
import ValidationFieldRules, { isRequiredRule } from './ValidationRules';
import ValidationObject from '../../../types/ValidationRules';
import { useFormikContext } from 'formik';

const inputFieldStyle: CSS.Properties = {
  marginLeft: '7px',
  marginTop: '5px',
};
type ValidationType = keyof typeof ValidationFieldRules;

interface Props {
  name: string;
  label: string;
  value: Record<string, any>;
  choices: { displayName: string; selectValue: string; inputType: InputType; validationType?: ValidationType }[];
  showRequiredToggle?: boolean;
}

const QuestionTypeSelect: React.FC<Props> = ({ name, label, value, choices, showRequiredToggle = true }) => {
  const [currentChoice, setCurrentChoice] = useState(choices.find((ch) => ch.selectValue === value.inputSelectValue));
  const [required, setRequired] = useState(false);
  const { setFieldValue } = useFormikContext();
  useEffect(() => {
    if (currentChoice?.validationType) {
      setRequired((value.validation as ValidationObject).isRequired);
    }
  }, [setRequired, currentChoice, value.validation]);

  const onChange = (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
  ) => {
    const val = event.target.value as string;
    const choice = choices.find((ch) => ch.selectValue === val);
    if (choice) {
      setCurrentChoice(choice);
      setFieldValue(`${name}.type`, choice.inputType);
      setFieldValue(`${name}.inputSelectValue`, choice.selectValue);
      const validationOptions = choice?.validationType ? ValidationFieldRules[choice.validationType] : undefined;
      if (validationOptions) {
        validationOptions.isRequired = required;
        if (required) validationOptions.rules.push(isRequiredRule);
      }
      setFieldValue(`${name}.validation`, validationOptions);
    }
  };

  const onToggleRequire = () => {
    const validationOptions = value.validation as ValidationObject | undefined;
    if (validationOptions) {
      validationOptions.isRequired = !required;
      if (!required) validationOptions.rules.push(isRequiredRule);
      else {
        const newValidationRules = validationOptions.rules.filter((rule) => rule.method !== 'isEmpty');
        validationOptions.rules = newValidationRules;
      }
    }
    setFieldValue(`${name}.validation`, validationOptions);
    setRequired(!required);
  };

  return (
    <FormGroup style={inputFieldStyle} row>
      <div style={{ paddingTop: '5px', marginRight: '10px' }}>{label} </div>
      <Select onChange={onChange} value={value['inputSelectValue'] || ''}>
        {choices
          ? choices.map((choice) => (
              <MenuItem key={choice.selectValue} value={choice.selectValue}>
                {choice.displayName}
              </MenuItem>
            ))
          : null}
      </Select>
      {currentChoice?.validationType && showRequiredToggle && (
        <>
          <div style={{ paddingTop: '5px', marginRight: '10px', marginLeft: '20px' }}>Is required?</div>
          <Switch checked={required} onChange={onToggleRequire} />
        </>
      )}
    </FormGroup>
  );
};

export default QuestionTypeSelect;
