import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Formik, FastField, Form } from 'formik';
import ReactJson from 'react-json-view';
import { Button, Paper, FormControlLabel, FormGroup, Switch, Typography } from '@material-ui/core';
import { Form as FormType } from '../../types/FormTypes';
import StepField from './Steps/StepField';
import FieldArrayWrapper from '../general/FieldArrayWrapper';
import FormDataField from './FormDataField';
import StepList from './StepList/StepList';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '20ch',
      },
    },
    input: {
      '& > *': {
        width: '500px',
      },
    },
    button: {
      '& > *': {
        margin: theme.spacing(1),
        width: '2ch',
      },
    },
    wrapper: {
      display: 'grid',
      gridTemplateColumns: '300px 800px',
    },
    column: {
      padding: theme.spacing(2),
    },
  }),
);

export interface FormBuilderProps {
  form: FormType;
  onSubmit: (form: FormType) => void;
}

const FormBuilder: React.FC<FormBuilderProps> = ({ onSubmit, form }: FormBuilderProps) => {
  const { id } = form;
  const [showJSON, setShowJSON] = useState(false);
  const classes = useStyles();

  return (
    <Formik
      initialValues={{ ...form }}
      onSubmit={(form: FormType) => {
        onSubmit(form);
      }}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <div className={classes.wrapper}>
            <div className={classes.column}>
              <StepList steps={values.steps} deleteStep={() => {}} />
            </div>
            <div className={classes.column}>
              <Paper style={{ padding: '20px', marginTop: '5px' }}>
                <Typography variant="h3">{values.name !== '' ? values.name : 'Unnamed form'}</Typography>
                {id ? <pre>Form id: {id}</pre> : null}
                <h3>Form data</h3>
                <FastField type="input" as={FormDataField} />

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
                    control={
                      <Switch checked={showJSON} onChange={() => setShowJSON(!showJSON)} name="showJsonToggle" />
                    }
                    label="Show JSON"
                  />
                </FormGroup>

                {showJSON && (
                  <div>
                    <h3>JSON Form data</h3>
                    <ReactJson src={values} name="Form" theme="monokai" />
                  </div>
                )}
              </Paper>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FormBuilder;
