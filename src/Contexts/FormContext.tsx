import React, { useState, useEffect } from 'react';
import * as Api from '../helpers/ApiRequest';
import { Form } from '../types/FormTypes';

const emptyFormList: Form[] = [];

interface FormContextType {
  forms: Form[];
  getForm: (id: string) => Promise<any>;
  fetchForms: () => void;
  createForm: (form: Form) => Promise<any>;
  deleteForm: (id: string) => void;
  updateForm: (id: string, form: Form) => void;
}

const defaultVal: FormContextType = {
  forms: emptyFormList,
  getForm: (id) => {
    return new Promise((f) => null);
  },
  createForm: (form) => {
    return new Promise((f) => null);
  },
  deleteForm: (id) => {
    console.log('Delete is not implemented.');
  },
  updateForm: (id, form) => {
    console.log('Update is not implemented.');
  },
  fetchForms: () => {
    console.log('Fetch is not implemented.');
  },
};

interface Props {
  children: React.ReactNode;
}

const FormContext = React.createContext<FormContextType>(defaultVal);

export const FormProvider = ({ children }: Props) => {
  const [forms, setForms] = useState(emptyFormList);

  useEffect(() => {
    fetchForms();
  }, []);

  const getForm = (id: string) => {
    return Api.getForm(id);
  };

  const fetchForms = () => {
    Api.getAllForms().then((res) => {
      if (res?.data?.forms) {
        setForms(res.data.forms);
      }
    });
  };

  const createForm = (form: Form) => {
    return Api.createForm(form).then((res) => {
      fetchForms();
      return res;
    });
  };

  const deleteForm = (id: string) => {
    Api.deleteForm(id).then(() => fetchForms());
  };

  const updateForm = async (id: string, formData: Form) => {
    await Api.updateForm(id, formData);
    fetchForms();
  };

  return (
    <FormContext.Provider value={{ forms, fetchForms, getForm, createForm, deleteForm, updateForm }}>
      {children}
    </FormContext.Provider>
  );
};
export default FormContext;
