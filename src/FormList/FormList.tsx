import React, {useState, useEffect} from 'react';
import CSS from 'csstype';
import { Link } from 'react-router-dom';
import { Form } from '../types/FormTypes';
import { Button, Modal, makeStyles } from '@material-ui/core';
import { getAllForms, deleteForm } from '../helpers/ApiRequest';


const formItemStyle: CSS.Properties = {
  backgroundColor: 'rgba(255, 255, 255, 0.85)',
  border:'1px solid green',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
  padding:'3px',
  margin:'10px',
  position:'relative',
  minHeight:'43px'
};

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
  description: ''};

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

  return (
    <div>
      <h2>Forms</h2>
        {forms.map((form, i) => {
            return (
                <div style={formItemStyle} key={form.id}>

                    <h3>
                        <Link to={`/edit/${form.id}`}>
                            {i+1}. {form.name}
                        </Link>

                        <div style={{position:'absolute', right:'10px', top:'8px', textAlign:'right'}}>
                          <Link to={`/edit/${form.id}`}>
                              <Button 
                                  style={{margin:'5px'}}
                                  variant="contained"
                                  color="primary"
                                  onClick={() => {} }>Edit</Button>
                          </Link>
                          <Button
                            style={{margin:'5px'}}
                            variant="contained"
                            color="secondary"
                            onClick={ () => { selectForm(form); show(); } }>Delete</Button>
                        
                    </div>
                    </h3>
                </div>
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
