import React from 'react';
import QuestionField from '../Questions/QuestionField';
import FieldArrayWrapper from '../../general/FieldArrayWrapper';
import ActionField from './ActionField';
import StepDataField from './StepDataField';
import BannerField from './BannerField';
import { InputFieldPropType } from '../../../types/PropTypes';

const StepField: React.FC<InputFieldPropType> = ({ name, value, ...other }: InputFieldPropType) => {
  return (
    <div>
      <h2>{value.title && value.title !== '' ? value.title : 'Unnamed step'}</h2>
      <StepDataField name={name} value={value} />
      <h3>Banner</h3>
      <BannerField name={`${name}.banner`} value={value} />

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
