import React from 'react';
import { InputFieldPropType } from './PropTypes';

export type InputType =
  | 'text'
  | 'number'
  | 'date'
  | 'checkbox'
  | 'array'
  | 'select'
  | 'editableList'
  | 'avatarList'
  | 'navigationButton'
  | 'navigationButtonGroup'
  | 'radioGroup'
  | 'summaryList'
  | 'repeaterField'
  | 'questionIdPicker'
  | 'loadPreviousToggle'
  | 'tags'
  | 'colorPicker'
  | 'arrayText'
  | 'arrayNumber'
  | 'arrayDate'
  | 'editableListText'
  | 'editableListNumber'
  | 'editableListDate'
  | 'card'
  | 'imageUploader';

export default interface FieldDescriptor {
  name: string;
  type: InputType;
  initialValue: string | boolean;
  placeholder?: string;
  label: string;
  choices?: Record<string, string>[];
  inputField?: React.FC<InputFieldPropType>;
  helpText?: string;
}
