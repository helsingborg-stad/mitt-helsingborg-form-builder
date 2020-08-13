import React, {useState, useEffect} from 'react';
import CSS from 'csstype';
import { Form } from '../types/FormTypes';
import { Button, Modal } from '@material-ui/core';
import { deleteForm } from '../helpers/ApiRequest';
import FormListItem from './FormListItem';

const modalStyle: CSS.Properties ={
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '400px',
  height: 'auto',
  backgroundColor: 'white',
  border: '2px solid #000',
  padding: '20px',
};

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

  const modalBody = (
    <div style={modalStyle} >
      <h2 id="modal-title">Are you sure you want to delete the form?</h2>
      <p id="simple-modal-description">
        This action cannot be undone, so be careful.
      </p>
      <Button
        style={{margin:'5px'}}
        variant="contained"
        color="primary"
        onClick={ close }>Close</Button>
      <Button
        style={{margin:'5px'}}
        variant="contained"
        color="secondary"
        onClick={ () => { if(selectedForm.id) delForm(selectedForm.id); close(); } }>Delete</Button>
    </div>
  )

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
      <Modal
        open={showModal}
        onClose={close}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {modalBody}
      </Modal>
    </div>
  )
}

export default FormList;
