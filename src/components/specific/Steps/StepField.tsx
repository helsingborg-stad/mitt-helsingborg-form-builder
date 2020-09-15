import React, { useContext } from 'react';
import { Field } from 'formik';
import QuestionField from '../Questions/QuestionField';
import FieldArrayWrapper from '../../general/FieldArrayWrapper';
import ActionField from './ActionField';
import StepDataField from './StepDataField';
import BannerField from './BannerField';
import { InputFieldPropType } from '../../../types/PropTypes';
import FormContext from '../../../contexts/FormContext';
import { OptionLevel } from '../../../types/FieldDescriptor';

const StepField: React.FC<InputFieldPropType> = ({ name, value, type, ...other }: InputFieldPropType) => {
  const { optionLevel } = useContext(FormContext);
  return (
    <div>
      <h2>{value.title && value.title !== '' ? value.title : 'Unnamed step'}</h2>
      <Field name={name} type="input" as={StepDataField} {...other} />
      {optionLevel >= OptionLevel.Intermediate && (
        <>
          <h3>Banner</h3>
          <Field name={`${name}.banner`} type="input" as={BannerField} {...other} />
        </>
      )}

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
