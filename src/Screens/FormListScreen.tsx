import React, {useState, useEffect} from 'react';
import { getAllForms } from '../helpers/ApiRequest';
import FormList from '../FormList/FormList';

interface FormData {
    forms: any[];
    count: number;
}

const FormListScreen: React.FC<any> = (props) => {

    const data: FormData = { forms:[], count:0};
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState(data);
    
    const loadCases = (): void => {
        setLoading(true);
        getAllForms().then( res => { setFormData(res.data); setLoading(false); } );
    }

    useEffect(() => {
        if(data.forms.length === 0){
            loadCases();
        }
      }, [data.forms.length]);

    if(loading){ return <h3>Loading</h3>}
    return (
        <div>
            <FormList forms={formData.forms} count={formData.count} />
        </div>
      );
}

export default FormListScreen;
