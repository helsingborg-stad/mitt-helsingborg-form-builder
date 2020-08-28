import React, { useContext } from 'react';
import FormList from '../components/specific/FormList/FormList';
import FormContext from '../contexts/FormContext';

const FormListScreen: React.FC = () => {
  const { forms, deleteForm } = useContext(FormContext);

  if (forms.length === 0) {
    return <h1>Loading</h1>;
  }
  return <FormList forms={forms} count={forms.length} deleteForm={deleteForm} />;
};

export default FormListScreen;
