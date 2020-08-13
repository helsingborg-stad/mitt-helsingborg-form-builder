import React from 'react';
import { Field } from 'formik';
import QuestionField from './QuestionField';
import FieldArrayWrapper from '../GeneralComponents/FieldArrayWrapper';
import ActionField from './ActionField';
import StepDataField from './StepDataField';
import BannerField from './BannerField';

const StepField: React.FC<any> = ({ onChange, onBlur, name, value, ...other}) => {
  return (
    <div>
        <Field
          name={name}
          type="input" as={StepDataField} />
        <h3>Banner</h3>
        <Field
          name={`${name}.banner`}
          type="input" as={BannerField} />

        <FieldArrayWrapper 
          heading="Questions" 
          parentName={name}
          name="questions"
          value={value}
          inputField={QuestionField}
          emptyObject={{
            label:'', description:'', type:'',
            id:""}}
        />

        <FieldArrayWrapper 
          heading="Actions" 
          parentName={name}
          name="actions"
          value={value}
          inputField={ActionField}
          emptyObject={{ label:'', type:'' }}
          color="green"
        />

    </div>
  )
}

export default StepField;
