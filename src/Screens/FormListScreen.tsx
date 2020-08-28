import React, { useState, useEffect, useContext } from 'react';
import FormList from '../components/specific/FormList/FormList';
import FormContext from '../contexts/FormContext';
import { Box } from '@material-ui/core';

const FormListScreen: React.FC<any> = () => {
  const [loading, setLoading] = useState(true);

  const { forms, deleteForm } = useContext(FormContext);

  useEffect(() => {
    if (forms.length !== 0) {
      setLoading(false);
    }
  }, [forms.length]);

  if (loading) {
    return <h1>Loading</h1>;
  }
  return (
    <Box>
      <FormList forms={forms} count={forms.length} deleteForm={deleteForm} />
    </Box>
  );
};

export default FormListScreen;
