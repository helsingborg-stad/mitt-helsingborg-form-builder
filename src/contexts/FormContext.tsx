import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Form, emptyForm } from '../types/FormTypes';
import FormRepositoryContext from './FormRepositoryContext';

const emptyFormList: Form[] = [];

interface FormContextType {
  forms: Form[];
  getForm: (id: string) => Promise<{ data: Form }>;
  createForm: (form: Form) => Promise<{ data: { Item: Form } }>;
  deleteForm: (id: string) => void;
  updateForm: (id: string, form: Form) => Promise<{ data: { Item: Form } }>;
}

const defaultVal: FormContextType = {
  forms: emptyFormList,
  getForm: () => {
    return new Promise(() => {
      return { data: emptyForm };
    });
  },
  createForm: () => {
    return new Promise(() => emptyForm);
  },
  deleteForm: () => {
    console.log('Delete is not implemented.');
  },
  updateForm: () => {
    return new Promise(() => emptyForm);
  },
};

interface Props {
  children: React.ReactNode;
}

const FormContext = React.createContext<FormContextType>(defaultVal);

export const FormProvider: React.FC<Props> = ({ children }: Props) => {
  const [forms, setForms] = useState(emptyFormList);
  const { formRepository } = useContext(FormRepositoryContext);

  const fetchForms = useCallback(() => formRepository.listForms().then(setForms), [formRepository]);

  useEffect(() => {
    fetchForms();
  }, [fetchForms, formRepository]);

  const getForm = async (formId: string) => {
    const form = await formRepository.getForm(formId);
    return { data: form };
  };
  const createForm = async (form: Form) => {
    const created = await formRepository.createForm(form);
    await fetchForms();
    return { data: { Item: created } };
  };

  const deleteForm = (formId: string) => formRepository.deleteForm(formId).then(() => fetchForms());

  const updateForm = (formId: string, formData: Form) => formRepository.updateForm(formId, formData).then((form) => {
      fetchForms();
      return {
        data: {
          Item: form,
        },
      };
    });

  return (
    <FormContext.Provider value={{ forms, getForm, createForm, deleteForm, updateForm }}>
      {children}
    </FormContext.Provider>
  );
};

export default FormContext;
