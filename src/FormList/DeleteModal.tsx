import React from 'react';
import CSS from 'csstype';
import { Form } from '../types/FormTypes';
import { Button, Modal } from '@material-ui/core';


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

interface ModalProps {
    form: Form;
    onDelete: () => void;
    open: boolean;
    onClose: () => void;
}

const DeleteModal: React.FC<ModalProps> =(props) => {
  const {form, onDelete, open, onClose} = props;

  const modalBody = (
    <div style={modalStyle} >
      <h2 id="modal-title">Are you sure you want to delete the form '{form.name}'?</h2>
      <p id="simple-modal-description">
        This action cannot be undone, so be careful.
      </p>
      <Button
        style={{margin:'5px'}}
        variant="contained"
        color="primary"
        onClick={ onClose }>Close</Button>
      <Button
        style={{margin:'5px'}}
        variant="contained"
        color="secondary"
        onClick={ () => { onDelete(); onClose(); } }>Delete</Button>
    </div>
  );

  return (
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {modalBody}
      </Modal>
    );
}

export default DeleteModal;
