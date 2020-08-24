import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form } from '../types/FormTypes';
import { Button } from '@material-ui/core';
import FormListItem from './FormListItem';
import DeleteModal from './DeleteModal';

const emptyForm: Form = {
  name: '',
  description: '',
  steps: [],
  subform: false,
};
interface Props {
  forms: Form[];
  count: number;
  deleteForm: (id: string) => void;
}

const FormList: React.FC<Props> = ({ forms, deleteForm }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedForm, selectForm] = useState(emptyForm);

  const show = () => {
    setShowModal(true);
  };
  const close = () => {
    setShowModal(false);
  };

  const delForm = (formId: string) => {
    deleteForm(formId);
  };

  const mainForms = forms.filter((f) => !f.subform);
  const subforms = forms.filter((f) => f.subform);

  return (
    <div>
      <Link to={`/edit`}>
        <Button style={{ margin: '5px' }} variant="contained" color="primary">
          Create new form
        </Button>
      </Link>
      <h2>Main Forms</h2>
      {mainForms.map((form, i) => {
        return (
          <FormListItem
            key={form.id || form.name}
            form={form}
            onDelete={() => {
              selectForm(form);
              show();
            }}
            index={i}
          />
        );
      })}
      <h2>Subforms</h2>
      {subforms.map((form, i) => {
        return (
          <FormListItem
            key={form.id || form.name}
            form={form}
            onDelete={() => {
              selectForm(form);
              show();
            }}
            index={i}
          />
        );
      })}

      <DeleteModal
        open={showModal}
        onClose={close}
        form={selectedForm}
        onDelete={() => {
          if (selectedForm.id) delForm(selectedForm.id);
        }}
      />
    </div>
  );
};

export default FormList;
