import React, { useState, useEffect } from 'react';
import { Button, Paper, FormControlLabel, FormGroup, Switch, Typography } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import { Step, ListItem } from '../../types/FormTypes';
import StepField from './Steps/StepField';
import FormDataField from './FormDataField';
import StepList from './StepList/StepList';
import StepPreview from '../../preview/step/Step';

import { matchStepStructureOrder, recursiveDelete } from './FormBuilderHelpers';

import { useStyles } from './useFormBuilderStyles';

export interface FormBuilderProps {
  showJson: boolean;
  stepStructure: ListItem[];
  steps: Step[];
  name: string;
  formId: string;
  onSetFieldValue: (field: string, value: any) => void;
  onToggleShowJson: () => void;
}

const FormBuilder: React.FC<FormBuilderProps> = ({
  onToggleShowJson,
  onSetFieldValue,
  showJson,
  stepStructure,
  steps,
  name,
  formId,
}: FormBuilderProps) => {
  const [selectedStepId, selectStep] = useState('');
  const classes = useStyles();

  useEffect(() => {
    const recursiveReplace = (titles: Record<string, string>, item: ListItem): ListItem => {
      return {
        id: item.id,
        text: titles[item.id] || 'Unnamed',
        children: item?.children ? item.children.map((i) => recursiveReplace(titles, i)) : [],
        group: item.group,
      };
    };

    if (steps && stepStructure.length === 0) {
      onSetFieldValue(
        'stepStructure',
        steps.map((step) => {
          return { id: step.id || '', text: step.title !== '' ? step.title : 'Unnamed', group: uuidv4() };
        }),
      );
    } else {
      const titles = steps.reduce((acc: Record<string, string>, curr: Step) => {
        acc[curr.id] = curr.title === '' ? 'Unnamed' : curr.title;
        return acc;
      }, {});
      const newStepStruct = stepStructure.map((s) => recursiveReplace(titles, s));
      onSetFieldValue('stepStructure', newStepStruct);
    }
  }, [steps]);

  const updateFormValues = (newStepStructure: ListItem[], newSteps: Step[]) => {
    const reorderedSteps = matchStepStructureOrder(newStepStructure, newSteps);
    onSetFieldValue('stepStructure', newStepStructure);
    onSetFieldValue('steps', reorderedSteps);
  };

  const addStep = () => {
    const newStep: Step = {
      title: 'Unnamed',
      description: '',
      group: '',
      id: uuidv4(),
      banner: { iconSrc: '', imageSrc: '', backgroundColor: '' },
      colorSchema: 'blue',
    };

    const newSteps = [...steps, newStep];
    const newStepStructure = [...stepStructure, { id: newStep.id, text: newStep.title, group: uuidv4() }];

    updateFormValues(newStepStructure, newSteps);
  };

  const deleteStep = (stepId: string) => {
    const newStepStructure = stepStructure.flatMap((stepStructureItem) => recursiveDelete(stepStructureItem, stepId));
    const newSteps = steps.filter((s) => s.id !== stepId);

    updateFormValues(newStepStructure, newSteps);
  };

  const copyStep = (stepId: string) => {
    const newStep: Step = JSON.parse(JSON.stringify(steps.find((s) => s?.id === stepId)));

    newStep.id = uuidv4();
    newStep.title += ' Copy';
    const newStepStructure = [...stepStructure, { id: newStep.id, text: newStep.title, group: uuidv4() }];
    const newSteps = [...steps, newStep];

    updateFormValues(newStepStructure, newSteps);
  };

  const handleStepStructureOrderChange = (newStepStructure: ListItem[]) => {
    updateFormValues(newStepStructure, steps);
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
          {formId ? <pre>Form id: {formId}</pre> : null}
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

  return (
    <div className={classes.wrapper}>
      <div className={classes.column}>
        <StepList
          selectedStepId={selectedStepId}
          stepStructure={stepStructure}
          selectStep={selectStep}
          deleteStep={deleteStep}
          copyStep={copyStep}
          addStep={addStep}
          onStepStructureOrderChange={handleStepStructureOrderChange}
        />
      </div>
      <div className={classes.column}>{renderFormOrStep({ name, steps })}</div>
      <div className={classes.column}>
        <FormGroup>
          <Button style={{ margin: '5px' }} variant="contained" color="primary" type="submit">
            Save form
          </Button>
          <FormControlLabel
            control={<Switch checked={showJson} onChange={onToggleShowJson} name="showJsonToggle" />}
            label="Show JSON"
          />
        </FormGroup>
        {renderPreview({ steps, name })}
      </div>
    </div>
  );
};

export default FormBuilder;
