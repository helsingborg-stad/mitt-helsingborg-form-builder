import React from 'react';
import CSS from 'csstype';
import { Link } from 'react-router-dom';
import { Form } from '../types/FormTypes';
import { Button } from '@material-ui/core';

const formItemStyle: CSS.Properties = {
  backgroundColor: 'rgba(255, 255, 255, 0.85)',
  border: '1px solid green',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
  padding: '3px',
  paddingLeft: '20px',
  margin: '10px',
  position: 'relative',
  minHeight: '43px',
};

interface Props {
  form: Form;
  index: number;
  onDelete: () => void;
}

const FormListItem: React.FC<Props> = (props) => {
  const { form, index, onDelete } = props;
  return (
    <div style={formItemStyle} key={form.id}>
      <h3>
        {`${index + 1}. `}
        <Link to={`/edit/${form.id}`}>{form.name && form.name !== '' ? form.name : 'Unnamed form'}</Link>

        <div style={{ position: 'absolute', right: '10px', top: '8px', textAlign: 'right' }}>
          <Link to={`/edit/${form.id}`}>
            <Button style={{ margin: '5px' }} variant="contained" color="primary">
              Edit
            </Button>
          </Link>
          <Button style={{ margin: '5px' }} variant="contained" color="secondary" onClick={onDelete}>
            Delete
          </Button>
        </div>
      </h3>
    </div>
  );
};

export default FormListItem;
