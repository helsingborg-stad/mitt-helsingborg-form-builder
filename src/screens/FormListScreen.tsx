import React, { useContext } from 'react';
import CSS from 'csstype';
import FormList from '../components/specific/FormList/FormList';
import FormContext from '../contexts/FormContext';

const container: CSS.Properties = {
  paddingTop: '40px',
  paddingBottom: '30px',
  marginLeft: 'auto',
  marginRight: 'auto',
  padding: '20px',
  maxWidth: '800px',
};

const FormListScreen: React.FC = () => {
  const { forms, deleteForm } = useContext(FormContext);

  if (forms.length === 0) {
    return <h1>Loading</h1>;
  }
  return (
    <div style={container}>
      <FormList forms={forms} count={forms.length} deleteForm={deleteForm} />
    </div>
  );
};

export default FormListScreen;
