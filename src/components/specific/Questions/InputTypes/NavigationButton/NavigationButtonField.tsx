import React from 'react';
import FieldDescriptor from '../../../../../types/FieldDescriptor';
import MultipleInputField from '../../../../general/MultipleInputField';
import { InputFieldPropType } from '../../../../../types/PropTypes';
import { colorChoices } from '../../../../../helpers/colors';

const fields: FieldDescriptor[] = [
  { name: 'text', type: 'text', initialValue: '', label: 'Button text' },
  {
    name: 'color',
    type: 'select',
    initialValue: '',
    label: 'Color theme',
    choices: colorChoices,
  },
  { name: 'iconName', type: 'text', initialValue: '', label: 'Icon name' },
  {
    name: 'navigationType',
    type: 'navigationButton',
    initialValue: '',
    label: 'Navigation Button',
  },
];

const NavigationButtonField: React.FC<InputFieldPropType> = (props: InputFieldPropType) => {
  return <MultipleInputField fields={fields} {...props} />;
};

export default NavigationButtonField;
