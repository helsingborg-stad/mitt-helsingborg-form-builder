import FieldDescriptor from './FieldDescriptor';
import ValidationRules from './ValidationRules';

export interface InputFieldPropType {
  name: string;
  value: Record<string, any>;
}

export type MultipleInputFieldPropType = InputFieldPropType & {
  fields: FieldDescriptor[];
  validation?: ValidationRules;
};
