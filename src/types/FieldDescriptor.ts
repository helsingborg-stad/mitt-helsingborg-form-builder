import React from 'react';
import { InputFieldPropType } from './PropTypes';

export enum OptionLevel {
  Basic,
  Intermediate,
  Advanced,
}

export default interface FieldDescriptor {
  name: string;
  type: string;
  initialValue: string | boolean;
  placeholder?: string;
  label: string;
  choices?: Record<string, string>[];
  inputField?: React.FC<InputFieldPropType>;
  optionLevel: OptionLevel;
}
