import { Form } from './FormTypes';

export type FormRepository = {
  listForms: () => Promise<Form[]>;
  getForm: (id: string) => Promise<Form>;
  createForm: (form: Form) => Promise<Form>;
  deleteForm: (id: string) => Promise<void>;
  updateForm: (id: string, form: Form) => Promise<Form>;
};
