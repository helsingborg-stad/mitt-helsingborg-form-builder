import FieldDescriptor from './FieldDescriptor';
import { ChangeEvent } from 'react';

export interface InputFieldPropType {
  name: string;
  value: Record<string, any>;
  type: string;
  onBlur: (e?: ChangeEvent<Element | { name?: string | undefined; value: unknown }>) => void;
  onChange: (e?: ChangeEvent<Element | { name?: string | undefined; value: unknown }>) => void;
  setFieldValue?: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
}

export interface MultipleInputFieldPropType {
  name: string;
  value: Record<string, any>;
  type: string;
  fields: FieldDescriptor[];
  onBlur: (e?: ChangeEvent | ChangeEvent<{ name?: string | undefined; value: unknown }>) => void;
  onChange: (e?: ChangeEvent | ChangeEvent<{ name?: string | undefined; value: unknown }>) => void;
  setFieldValue?: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
}
