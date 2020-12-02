import React from 'react';
import FieldDescriptor from '../../../types/FieldDescriptor';
import MultipleInputField from '../../general/MultipleInputField';
import { InputFieldPropType } from '../../../types/PropTypes';

const helpFields: FieldDescriptor[] = [
  { name: 'heading', type: 'text', initialValue: '', label: 'Heading' },
  { name: 'tagline', type: 'text', initialValue: '', label: 'Tagline' },
  { name: 'text', type: 'text', initialValue: '', label: 'Text' },
  { name: 'url', type: 'text', initialValue: '', label: 'URL (link the button to a website)' },
];

const HelpField: React.FC<InputFieldPropType> = (props) => {
  return <MultipleInputField fields={helpFields} {...props} />;
};

export default HelpField;
