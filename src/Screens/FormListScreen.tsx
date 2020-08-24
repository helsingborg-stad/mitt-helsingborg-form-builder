import React, { useState, useEffect, useContext } from 'react';
import FormList from '../FormList/FormList';
import FormContext from '../Contexts/FormContext';

const FormListScreen: React.FC<any> = (props) => {
  const [loading, setLoading] = useState(true);

  const { forms } = useContext(FormContext);

  useEffect(() => {
    if (forms.length !== 0) {
      setLoading(false);
    }
  }, [forms.length]);

  if (loading) {
    return <h1>Loading</h1>;
  }
  return (
    <div>
      <FormList forms={forms} count={forms.length} />
    </div>
  );
};

export default FormListScreen;
