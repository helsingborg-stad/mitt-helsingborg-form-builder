import React, { useState, useEffect } from 'react';
import * as Api from '../helpers/ApiRequest';
import { Form } from '../types/FormTypes';

const emptyFormList: Form[] = [];
const emptyForm: Form = { name: '', description: '', id: '' };

interface FormContextType {
  forms: Form[];
  getForm: (id: string) => Promise<{ data: Form }>;
  fetchForms: (apikey: string & undefined) => void;
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
  fetchForms: () => {
    console.log('Fetch is not implemented.');
  },
};

interface Props {
  children: React.ReactNode;
  apikey: string;
}

const FormContext = React.createContext<FormContextType>(defaultVal);

export const FormProvider: React.FC<Props> = ({ children, apikey }: Props) => {
  const [forms, setForms] = useState(emptyFormList);

  useEffect(() => {
    fetchForms(apikey);
  }, [apikey]);

  const getForm = (id: string) => {
    return Api.getForm(id);
  };

  const fetchForms = (apikey?: string) => {
    Api.getAllForms(apikey).then((res) => {
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
    return Api.updateForm(id, formData)
      .then(res => {
        fetchForms();
        return res;
      });
  };

  return (
    <FormContext.Provider value={{ forms, fetchForms, getForm, createForm, deleteForm, updateForm }}>
      {children}
    </FormContext.Provider>
  );
};
export default FormContext;
