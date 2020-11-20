import FieldDescriptor from './FieldDescriptor';
import { ChangeEvent } from 'react';
import ValidationRules from './ValidationRules';

export interface InputFieldPropType {
  name: string;
  value: Record<string, any>;
  // type: string;
  // onBlur: (e?: ChangeEvent<Element | { name?: string | undefined; value: unknown }>) => void;
  onChange: (e?: ChangeEvent<Element | { name?: string | undefined; value: unknown }>) => void;
}

export interface MultipleInputFieldPropType {
  name: string;
  value: Record<string, any>;
  // type: string;
  fields: FieldDescriptor[];
  // onBlur: (e?: ChangeEvent | ChangeEvent<{ name?: string | undefined; value: unknown }>) => void;
  onChange: (e?: ChangeEvent | ChangeEvent<{ name?: string | undefined; value: unknown }>) => void;
  validation?: ValidationRules;
}
