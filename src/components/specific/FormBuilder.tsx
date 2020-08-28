import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import { Button, Paper, FormControlLabel, FormGroup, Switch, Typography } from '@material-ui/core';
import { Step, Form as FormType } from '../../types/FormTypes';
import StepField from './Steps/StepField';
import FieldArrayWrapper from '../general/FieldArrayWrapper';
import FormDataField from './FormDataField';

export interface FormBuilderProps {
  name: string;
  description: string;
  provider?: string;
  steps?: Step[];
  id?: string;
  onSubmit: (form: FormType) => void;
  subform?: boolean;
}

const FormBuilder: React.FC<FormBuilderProps> = (props: FormBuilderProps) => {
  const { id, onSubmit } = props;
  const [showJSON, setShowJSON] = useState(false);
  return (
    <Paper style={{ padding: '20px', marginTop: '5px' }}>
      <Formik
        initialValues={{
          name: props.name,
          description: props.description,
          provider: props.provider ? props.provider : '',
          steps: props.steps,
          subform: props.subform,
          id: id ? id : '',
        }}
        onSubmit={(form: FormType) => {
          onSubmit(form);
        }}
      >
        {({ values }) => (
          <Form>
            <Typography variant="h3">{values.name !== '' ? values.name : 'Unnamed form'}</Typography>
            {id ? <pre>Form id: {id}</pre> : null}
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
