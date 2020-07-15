import React from 'react';
import CSS from 'csstype';
import { Link } from 'react-router-dom';
import { Form } from '../types/FormTypes';
import { Button } from '@material-ui/core';


const formItemStyle: CSS.Properties = {
  backgroundColor: 'rgba(255, 255, 255, 0.85)',
  border:'1px solid green',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
  padding:'3px',
  margin:'10px',
  position:'relative',
  minHeight:'43px'
};

interface FormListProps {
    forms: Form[];
}


const FormList: React.FC<FormListProps> =(props) => {
  const {forms} = props;
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
                        
                    </div>
                    </h3>
                </div>
            )
        })}
    </div>
  )
}

export default FormList;
