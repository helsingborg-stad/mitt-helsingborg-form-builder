import FieldDescriptor from './FieldDescriptor';

export interface InputFieldPropType {
  name: string;
  value: Record<string, any>;
  type: string;
  onBlur: (e?: any) => void;
  onChange: (e?: any) => void;
}

export interface MultipleInputFieldPropType {
  name: string;
  value: Record<string, any>;
  type: string;
  fields: FieldDescriptor[];
  onBlur: (e?: any) => void;
  onChange: (e?: any) => void;
}
