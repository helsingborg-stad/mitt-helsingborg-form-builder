import React, {useState, useEffect} from 'react';
import FormBuilder from '../SpecificComponents/FormBuilder';
import {Question, Form} from '../types/FormTypes';
import { useParams, Link } from 'react-router-dom';
import { getForm, updateForm, createForm } from '../helpers/ApiRequest';

const emptyQuestions: Question[] = [];
const emptyForm={
    name:'',
    description:'',
    steps : [{
      title:'',
      description:'',
      group:'',
      questions: emptyQuestions,
      id:""+Math.random(),
    }],
  };


const FormBuilderScreen: React.FC<any> = (props) => {

    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState(emptyForm);
    const { id } = useParams();
    
    const loadCase = (id: string): void => {
        if(loading){
            getForm(id).then(res => { 
                setForm(res.data);
                setLoading(false);
            });
        }
    }

    
    const create = (form: Form) => {
        createForm(form).then( res => console.log(res));        
    }
    
    
    const update = (form: Form) => {
        if(id && id !==''){
            updateForm(id, form).then(res => { console.log(res)}); 
        }
    }

    const onSubmit = (form: Form) => {
        if(id && id !== '') {
            update(form);
        } else {
            create(form);
        }
    }
    
    useEffect(() => {
        if(id && id !== ''){
            loadCase(id);
        }
      }, [id]);




    if(loading){ return <h3>Loading</h3>}
    
    return (
    <div>
        <Link to='/'>Back to list</Link>
        <FormBuilder onSubmit={onSubmit} {...form} />
    </div>);
}

export default FormBuilderScreen;
