import React, {useState, useEffect} from 'react';
import { getAllForms, getForm } from '../helpers/ApiRequest';
import FormList from '../FormList/FormList';


const FormListScreen: React.FC<any> = (props) => {

    const data: any[] = [];
    const [loading, setLoading] = useState(true);
    const [forms, setForms] = useState(data);
    
    const loadCases = (): void => {
        setLoading(true);
        getAllForms().then( res => { setForms(res.data); setLoading(false); } );
    }

    useEffect(() => {
        if(forms.length === 0){
            loadCases();
        }
      }, [forms.length]);



    if(loading){ return <h3>Loading</h3>}
    return (
        <div>
            <FormList forms={forms} />
        </div>
      );
}

export default FormListScreen;
