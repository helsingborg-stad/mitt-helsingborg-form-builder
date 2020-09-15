import React, { useState, useContext } from 'react';
import { Formik, Field, Form } from 'formik';
import { Slider, Button, Paper, FormControlLabel, FormGroup, Switch, Typography } from '@material-ui/core';
import { Form as FormType } from '../../types/FormTypes';
import StepField from './Steps/StepField';
import FieldArrayWrapper from '../general/FieldArrayWrapper';
import FormDataField from './FormDataField';
import FormContext from '../../contexts/FormContext';
import { OptionLevel } from '../../types/FieldDescriptor';

export interface FormBuilderProps {
  form: FormType;
  onSubmit: (form: FormType) => void;
}

const FormBuilder: React.FC<FormBuilderProps> = ({ onSubmit, form }: FormBuilderProps) => {
  const { optionLevel, setOptionLevel } = useContext(FormContext);
  const { id } = form;
  const [showJSON, setShowJSON] = useState(false);

  const marks = [
    {
      value: 0,
      label: 'Basic',
    },
    {
      value: 1,
      label: 'Intermediate',
    },
    {
      value: 2,
      label: 'Advanced',
    },
  ];
  const optionLevelMap: Record<number, OptionLevel> = {
    0: OptionLevel.Basic,
    1: OptionLevel.Intermediate,
    2: OptionLevel.Advanced,
  };

  return (
    <Paper style={{ padding: '20px', marginTop: '5px' }}>
      <Formik
        initialValues={{ ...form }}
        onSubmit={(form: FormType) => {
          onSubmit(form);
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <Typography variant="h3">{values.name !== '' ? values.name : 'Unnamed form'}</Typography>
            {id ? <pre>Form id: {id}</pre> : null}
            <Typography id="discrete-slider-always" gutterBottom>
              Settings level (careful when editing advanced settings)
            </Typography>
            <div style={{ width: '30%', minWidth: '200px' }}>
              <Slider
                style={{ marginLeft: '12px' }}
                defaultValue={0}
                aria-labelledby="discrete-slider-custom"
                step={1}
                min={0}
                max={2}
                onChange={(_, value) => {
                  if (typeof value === 'number') {
                    setOptionLevel(optionLevelMap[value]);
                  }
                }}
                marks={marks}
              />
            </div>
            <h3>Form data</h3>
            <Field type="input" as={FormDataField} />

            <div style={{ border: '1px solid gray', padding: '10px' }}>
              <FieldArrayWrapper
                heading="Steps"
                parentName=""
                name="steps"
                color="blue"
                value={values}
                inputField={StepField}
                setFieldValue={setFieldValue}
                emptyObject={{
                  title: '',
                  description: '',
                  group: '',
                  id: '',
                  banner: { iconSrc: '', imageSrc: '', backgroundColor: '' },
                }}
              />
            </div>

            <FormGroup row>
              <Button style={{ margin: '5px' }} variant="contained" color="primary" type="submit">
                Submit
              </Button>
              <FormControlLabel
                control={<Switch checked={showJSON} onChange={() => setShowJSON(!showJSON)} name="showJsonToggle" />}
                label="Show JSON"
              />
            </FormGroup>

            {showJSON && (
              <div>
                <h3>JSON Form data</h3>
                <pre>{JSON.stringify(values, null, 2)}</pre>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </Paper>
  );
};

export default FormBuilder;
