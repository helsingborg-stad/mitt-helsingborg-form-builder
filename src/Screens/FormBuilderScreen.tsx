import React, {useState, useEffect} from 'react';
import FormBuilder from '../SpecificComponents/FormBuilder';
import {Question, Form} from '../types/FormTypes';
import { useParams, Link, Redirect } from 'react-router-dom';
import { getForm, updateForm, createForm } from '../helpers/ApiRequest';

const emptyQuestions: Question[] = [];
const emptyBanner = {
    imageSrc:'',
    iconSrc:'',
    backgroundColor:'',
}
const emptyForm = {
    name:'',
    description:'',
    subform:false,
    steps : [{
      title:'',
      description:'',
      group:'',
      banner: emptyBanner,
      questions: emptyQuestions,
      id:""+Math.random(),
    }],
  };

const FormBuilderScreen: React.FC<any> = (props) => {
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState(emptyForm);
    const [redirectComp, setRedirectComp] = useState(<> </>);
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
        createForm(form)
          .then( res => {
              console.log(res);
            //   setLoading(true);
              const formId = res.data.Item.id;
              console.log('new id:', formId);
              setRedirectComp(<Redirect to={`/edit/${formId}`} />);
          });        
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
        } else {
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [id]);

    if(loading){ return <h3>Loading...{redirectComp}</h3>}
    
    return (
    <div>
        <Link to='/'>Back to list</Link>
        <FormBuilder onSubmit={onSubmit} {...form} />
        {redirectComp}
    </div>);
}

export default FormBuilderScreen;
