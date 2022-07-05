import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { Button, Paper, FormControlLabel, FormGroup, Switch, Typography } from '@material-ui/core';
import ReactJson from 'react-json-view';
import { v4 as uuidv4 } from 'uuid';
import { Form as FormType, Step, ListItem } from '../../types/FormTypes';
import StepField from './Steps/StepField';
import FormDataField from './FormDataField';
import StepList from './StepList/StepList';
import StepPreview from '../../preview/step/Step';

import { computeMatrix } from './FormBuilderHelpers';

import { useStyles } from './useFormBuilderStyles';

export interface FormBuilderProps {
  form: FormType;
  onSubmit: (form: FormType) => void;
}

const FormBuilder: React.FC<FormBuilderProps> = ({ onSubmit, form }: FormBuilderProps) => {
  const { id } = form;
  const [selectedStepId, selectStep] = useState('');
  const [showJSON, setShowJSON] = useState(false);
  const [stepStructure, setStepStructure] = useState(form?.stepStructure || []);
  const classes = useStyles();

  const addStep = (
    steps: Step[],
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void,
  ) => () => {
    const newStep: Step = {
      title: 'Unnamed',
      description: '',
      group: '',
      id: uuidv4(),
      banner: { iconSrc: '', imageSrc: '', backgroundColor: '' },
      colorSchema: 'blue',
    };
    const newSteps = [...steps, newStep];

    const newStepStructureSteps = [...stepStructure, { id: newStep.id, text: newStep.title, group: uuidv4() }];

    setStepStructure(newStepStructureSteps);
    setFieldValue('steps', newSteps);
  };

  const deleteStep = (
    steps: Step[],
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void,
  ) => (stepId: string) => {
    const newSteps = steps.filter((s) => s?.id !== stepId);
    setFieldValue('steps', newSteps);
  };
  const copyStep = (
    steps: Step[],
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void,
  ) => (stepId: string) => {
    const newStep: Step = JSON.parse(JSON.stringify(steps.find((s) => s?.id === stepId)));

    newStep.id = uuidv4();
    newStep.title += ' Copy';
    const newSteps = [...steps, newStep];
    setFieldValue('steps', newSteps);
    return newStep;
  };

  const renderFormOrStep = (values: { name: string; steps?: Step[] }) => {
    if (values.steps) {
      const index = values.steps.findIndex((step) => step?.id === selectedStepId);
      if (index >= 0) {
        return (
          <Paper elevation={3} className={classes.subcontainer}>
            <StepField name={`steps.${index}`} value={values.steps[index]} />
          </Paper>
        );
      }
    }
    if (!values?.steps || selectedStepId === '') {
      return (
        <Paper style={{ padding: '20px', marginTop: '5px' }}>
          <Typography variant="h3">{values.name !== '' ? values.name : 'Unnamed form'}</Typography>
          {id ? <pre>Form id: {id}</pre> : null}
          <h3>Form data</h3>
          <FormDataField name="" value={values} />
        </Paper>
      );
    }
  };

  const renderPreview = (values: { name: string; steps?: Step[] }) => {
    if (values.steps) {
      const index = values.steps.findIndex((step) => step?.id === selectedStepId);
      if (index >= 0) {
        return <StepPreview stepData={values.steps[index]} />;
      }
    }
  };

  const setStepStruct = (setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void) => (
    items: ListItem[] | ((prevState: ListItem[]) => ListItem[]),
  ) => {
    setStepStructure(items);
    setFieldValue('stepStructure', items);
  };

  return (
    <Formik
      initialValues={{ ...form }}
      onSubmit={(form: FormType) => {
        onSubmit(form);
      }}
    >
      {({ values, setFieldValue, handleSubmit, setValues }) => {
        return (
          <Form
            onSubmit={(e) => {
              const matrix = computeMatrix(stepStructure);
              values.connectivityMatrix = matrix;
              setValues(values);
              handleSubmit(e);
            }}
          >
            <div className={classes.wrapper}>
              <div className={classes.column}>
                <StepList
                  steps={values.steps || []}
                  deleteStep={deleteStep(values.steps || [], setFieldValue)}
                  copyStep={copyStep(values.steps || [], setFieldValue)}
                  addStep={addStep(values.steps || [], setFieldValue)}
                  selectedStepId={selectedStepId}
                  selectStep={selectStep}
                  stepStructure={stepStructure}
                  setStepStructure={setStepStruct(setFieldValue)}
                />
              </div>
              <div className={classes.column}>{renderFormOrStep(values)}</div>
              <div className={classes.column}>
                <FormGroup>
                  <Button style={{ margin: '5px' }} variant="contained" color="primary" type="submit">
                    Save form
                  </Button>
                  <FormControlLabel
                    control={
                      <Switch checked={showJSON} onChange={() => setShowJSON(!showJSON)} name="showJsonToggle" />
                    }
                    label="Show JSON"
                  />
                </FormGroup>
                {renderPreview(values)}
              </div>
            </div>

            {showJSON && (
              <div>
                <h3>JSON Form data</h3>
                <ReactJson src={values} name="Form" theme="monokai" />
              </div>
            )}
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormBuilder;
