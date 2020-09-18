import React from 'react';
import { FastField } from 'formik';
import QuestionField from '../Questions/QuestionField';
import FieldArrayWrapper from '../../general/FieldArrayWrapper';
import ActionField from './ActionField';
import StepDataField from './StepDataField';
import BannerField from './BannerField';
import { InputFieldPropType } from '../../../types/PropTypes';

const StepField: React.FC<InputFieldPropType> = ({ name, value, type, ...other }: InputFieldPropType) => {
  return (
    <div>
      <h2>{value.title && value.title !== '' ? value.title : 'Unnamed step'}</h2>
      <FastField name={name} type="input" as={StepDataField} {...other}/>
      <h3>Banner</h3>
      <FastField name={`${name}.banner`} type="input" as={BannerField} {...other}/>

      <FieldArrayWrapper
        key="questions"
        heading="Questions"
        parentName={name}
        name="questions"
        value={value}
        inputField={QuestionField}
        emptyObject={{
          label: '',
          description: '',
          type: '',
          id: '',
        }}
        {...other}
      />

      <FieldArrayWrapper
        key="actions"
        heading="Actions"
        parentName={name}
        name="actions"
        value={value}
        inputField={ActionField}
        emptyObject={{ label: '', type: '' }}
        color="green"
        {...other}
      />
    </div>
  );
};

export default StepField;
