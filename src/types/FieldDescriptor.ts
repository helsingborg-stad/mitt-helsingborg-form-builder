import React from 'react';
import { InputFieldPropType } from './PropTypes';

export default interface FieldDescriptor {
  name: string;
  type: string;
  initialValue: string | boolean;
  placeholder?: string;
  label: string;
  choices?: Record<string, string>[];
  inputField?: React.FC<InputFieldPropType>;
}
