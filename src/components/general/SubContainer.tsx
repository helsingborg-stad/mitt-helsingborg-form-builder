import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { ArrayHelpers, FastField } from 'formik';
import { Button, Paper } from '@material-ui/core';
import StepField from '../specific/Steps/StepField';
import { InputFieldPropType } from '../../types/PropTypes';
import { ValueArray } from './FieldArrayWrapper';
import { getPropertyFromDottedString } from '../../helpers/object';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
    demo: {
      color: 'white',
      backgroundColor: '#424242', //theme.palette.primary.light,
      // backgroundColor: theme.palette.background.paper,
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
  }),
);

interface Props {
  name: string;
  currentIndex: number;
  value: Record<string, boolean | string | ValueArray | undefined>;
  color: string;
  inputField: React.FC<InputFieldPropType>;
  arrayHelpers: ArrayHelpers;
  itemValues?: Record<string, string | boolean | number>;
  setFieldValue?: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
}

const SubContainer: React.FC<Props> = ({
  itemValues,
  name,
  currentIndex,
  inputField,
  arrayHelpers,
  color,
  value,
  ...other
}: Props) => {
  const [collapsed, setCollapsed] = useState(true);
  const classes = useStyles();

  const makeCopy = (index: number): void => {
    const copy = JSON.parse(JSON.stringify(getPropertyFromDottedString(value, name)));

    if (copy?.title && typeof copy.title === 'string') copy.title += ' Copy';
    if (copy?.label && typeof copy.label === 'string') copy.label += ' Copy';
    if (copy?.description && typeof copy.description === 'string') copy.description += ' Copy';

    arrayHelpers.insert(index + 1, copy);
  };

  const vals = inputField === StepField ? { value: itemValues } : {};
  if (!collapsed) {
    return (
      <Paper elevation={3} style={{ borderColor: color ? color : 'red' }} className={classes.subcontainer} key={name}>
        <FastField name={name} type="input" as={inputField} {...vals} {...other} />

        <div style={{ display: 'block', textAlign: 'right' }}>
          {currentIndex > 0 ? (
            <Button
              style={{ margin: '5px' }}
              variant="contained"
              color="primary"
              onClick={() => arrayHelpers.swap(currentIndex, currentIndex - 1)}
            >
              ^
            </Button>
          ) : null}
          <Button style={{ margin: '5px' }} variant="contained" color="default" onClick={() => setCollapsed(true)}>
            Collapse
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              makeCopy(currentIndex);
            }}
          >
            Copy
          </Button>
          <Button variant="contained" color="secondary" onClick={() => arrayHelpers.remove(currentIndex)}>
            X
          </Button>
        </div>
      </Paper>
    );
  }

  // Which fields to look for when generating a title to show when collapsed, in falling priority.
  const prioritizedTitles = ['title', 'label', 'heading', 'description', 'text'];
  const n = prioritizedTitles.reduce((foundTitle: string, current: string) => {
    if (foundTitle !== '') return foundTitle;
    if (itemValues && itemValues[current] && itemValues[current] !== '') return itemValues[current] as string;
    return '';
  }, '');
  const containerName = n !== '' ? n : 'Unnamed';

  return (
    <div key={currentIndex}>
      <h4 style={{ borderColor: color ? color : 'red' }} className={classes.subcontainer}>
        {currentIndex + 1}. {containerName}
        <div style={{ display: 'inline', position: 'absolute', right: '0px' }}>
          {currentIndex > 0 ? (
            <Button
              style={{ margin: '5px' }}
              variant="contained"
              color="primary"
              onClick={() => arrayHelpers.swap(currentIndex, currentIndex - 1)}
            >
              ^
            </Button>
          ) : null}

          <Button style={{ margin: '5px' }} variant="contained" color="default" onClick={() => setCollapsed(false)}>
            Show
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              makeCopy(currentIndex);
            }}
          >
            Copy
          </Button>
          <Button
            style={{ margin: '5px' }}
            variant="contained"
            color="secondary"
            onClick={() => arrayHelpers.remove(currentIndex)}
          >
            X
          </Button>
        </div>
      </h4>
    </div>
  );
};

export default SubContainer;
