import FieldDescriptor from './FieldDescriptor';
import { ChangeEvent } from 'react';

export interface InputFieldPropType {
  name: string;
  value: Record<string, any>;
  type: string;
  onBlur: (e?: ChangeEvent<any>) => void;
  onChange: (e?: ChangeEvent<any>) => void;
}

export interface MultipleInputFieldPropType {
  name: string;
  value: Record<string, any>;
  type: string;
  fields: FieldDescriptor[];
  onBlur: (e?: ChangeEvent<any>) => void;
  onChange: (e?: ChangeEvent<any>) => void;
}
