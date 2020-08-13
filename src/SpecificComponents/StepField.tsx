import React from 'react';
import { Field } from 'formik';
import QuestionField from './QuestionField';
import FieldArrayWrapper from '../GeneralComponents/FieldArrayWrapper';
import ActionField from './ActionField';
import StepDataField from './StepDataField';

const StepField: React.FC<any> = ({ onChange, onBlur, name, value, ...other}) => {
  return (
    <div>
      { <Field
          name={name}
          type="input" as={StepDataField} />}

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
