import React, {useState, useEffect} from 'react';
import CSS from 'csstype';
import { Form } from '../types/FormTypes';
import { Button, Modal } from '@material-ui/core';
import { deleteForm } from '../helpers/ApiRequest';
import FormListItem from './FormListItem';
import DeleteModal from './DeleteModal';

interface FormListProps {
    forms: Form[];
    count: number;
}

const emptyFormList: Form[] = [];
const emptyForm: Form = {
  name: '',
  description: ''
};

const FormList: React.FC<FormListProps> =(props) => {

  const [forms, setForms] = useState(emptyFormList);
  const [showModal, setShowModal] = useState(false);
  const [selectedForm, selectForm] = useState(emptyForm);

  const show = () => { setShowModal(true);};
  const close = () => { setShowModal(false);};

  const delForm = (formId:string) => { 
    deleteForm(formId); 
    removeForm(formId); 
   }
  
  useEffect( () => {
    setForms(props.forms);
  }, [props.forms]);

  function removeForm( id: string) {
    const newForms = forms.filter(f => f.id !== id);
    setForms(newForms);
  }

  const mainForms = forms.filter(f => !f.subform);
  const subforms = forms.filter(f => f.subform);

  return (
    <div>
      <h2>Main Forms</h2>
        {mainForms.map((form, i) => {
          return (
            <FormListItem
              key={form.id || form.name} 
              form={form} 
              onDelete={() => {selectForm(form); show();}}
              index={i} />
          )
        })}
      <h2>Subforms</h2>
        {subforms.map((form, i) => {
          return (
            <FormListItem
              key={form.id || form.name}
              form={form} 
              onDelete={() => {selectForm(form); show();}}
              index={i} />
          )
        })}
      
      <DeleteModal 
        open={showModal}
        onClose={close}
        form={selectedForm}
        onDelete={() => { if(selectedForm.id) delForm(selectedForm.id)}} />

    </div>
  )
}

export default FormList;
