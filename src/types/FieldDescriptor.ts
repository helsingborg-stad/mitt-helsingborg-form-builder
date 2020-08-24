export default interface FieldDescriptor {
  name: string;
  type: string;
  initialValue: any;
  placeholder?: string;
  label: string;
  choices?: Record<string, string>[];
  inputField?: any;
}
