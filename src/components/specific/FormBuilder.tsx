import React, { useState, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Formik, FastField, Form, Field } from 'formik';
import ReactJson from 'react-json-view';
import { Button, Paper, FormControlLabel, FormGroup, Switch, Typography } from '@material-ui/core';
import { Form as FormType, Step, StepperActions } from '../../types/FormTypes';
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
    subcontainer: {
      flexGrow: 1,
      maxWidth: 752,
      margin: theme.spacing(4, 0, 2),
      backgroundColor: 'rgba(255, 255, 255, 0.10)',
      borderWidth: '1px',
      borderStyle: 'solid',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
      padding: theme.spacing(1),
      position: 'relative',
      minHeight: '45px',
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
      gridTemplateColumns: '400px 800px 200px',
    },
    column: {
      padding: theme.spacing(2),
    },
  }),
);
interface ListItem {
  id: string;
  text: string;
  children?: ListItem[];
}
export interface FormBuilderProps {
  form: FormType;
  onSubmit: (form: FormType) => void;
}

const computeMatrix = (stepStruct: ListItem[], steps: Step[]): StepperActions[][] => {
  const indices: Record<string, number> = steps.reduce((res: Record<string, number>, current, index) => {
    res[current.id] = index;
    return res;
  }, {});
  const emptyMatrix = [...Array(steps.length)].map((e) => Array(steps.length).fill('none'));

  const getDownIndices = (item: ListItem) => {
    if (item.children) {
      return item.children.map((i) => indices[i.id]);
    }
    return [];
  };

  const recursiveBuild = (stepStruct: ListItem[], matrix: StepperActions[][], currentLevel: number) => {
    stepStruct.forEach((currentStep, index) => {
      const currentStepIndex = indices[currentStep.id];
      if (currentLevel === 0) {
        if (index > 0) {
          const backIndex = indices[stepStruct[index - 1].id];
          matrix[currentStepIndex][backIndex] = 'back';
        }
        if (index < stepStruct.length - 1) {
          const nextIndex = indices[stepStruct[index + 1].id];
          matrix[currentStepIndex][nextIndex] = 'next';
        }
      }

      getDownIndices(currentStep).forEach((n) => {
        matrix[currentStepIndex][n] = 'down';
        matrix[n][currentStepIndex] = 'up';
      });
      if (currentStep.children) {
        recursiveBuild(currentStep.children, matrix, currentLevel + 1);
      }
    });
    return matrix;
  };
  const matrix = recursiveBuild(stepStruct, emptyMatrix, 0);
  return matrix;
};

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
    const newStep = {
      title: '',
      description: '',
      group: '',
      id: `${Math.ceil(Math.random() * 100000 + 1)}`,
      banner: { iconSrc: '', imageSrc: '', backgroundColor: '' },
    };
    const newSteps = [...steps, newStep];
    setFieldValue('steps', newSteps);
    return newStep;
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

    newStep.id = `${Math.ceil(Math.random() * 10000 + 1)}`;
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
            <FastField name={`steps.${index}`} type="input" as={StepField} {...values?.steps} />
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
          <FastField type="input" as={FormDataField} />
        </Paper>
      );
    }
  };

  const setStepStruct = (
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void,
    steps: Step[],
  ) => (items: ListItem[] | ((prevState: ListItem[]) => ListItem[])) => {
    if (Array.isArray(items)) {
      const matrix = computeMatrix(items, steps);
      setFieldValue('connectivityMatrix', matrix);
    }
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
      {({ values, setFieldValue }) => {
        return (
          <Form>
            <div className={classes.wrapper}>
              <div className={classes.column}>
                <StepList
                  steps={values.steps}
                  deleteStep={deleteStep(values.steps || [], setFieldValue)}
                  copyStep={copyStep(values.steps || [], setFieldValue)}
                  addStep={addStep(values.steps || [], setFieldValue)}
                  selectedStepId={selectedStepId}
                  selectStep={selectStep}
                  stepStructure={stepStructure}
                  setStepStructure={setStepStruct(setFieldValue, values?.steps || [])}
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
