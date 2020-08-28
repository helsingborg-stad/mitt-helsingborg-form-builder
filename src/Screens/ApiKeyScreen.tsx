import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import CSS from 'csstype';
import { TextField, Button } from '@material-ui/core';

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
  }),
);

export enum KeyStatus {
  Loading = 'LOADING',
  NotProvided = 'NOT_PROVIDED',
  Valid = 'VALID',
  Invalid = 'INVALID',
}

const invalidText: CSS.Properties = {
  marginTop: '20px',
  marginBottom: '30px',
  padding: '20px',
  color: 'red',
};

interface PropType {
  setApikey: (key: string) => void;
  keyStatus: KeyStatus;
}

const ApiKeyScreen: React.FC<PropType> = ({ setApikey, keyStatus }: PropType) => {
  const classes = useStyles();

  const submit = () => {
    const apikeyInputEl = document.getElementById('apikey') as HTMLInputElement;
    const apikey = apikeyInputEl.value;
    setApikey(apikey);
  };

  return (
    <div>
      <h2>Input api key:</h2>
      <form className={classes.root}>
        <TextField className={classes.input} fullWidth variant="outlined" id="apikey" label="Api key" />
        <br />
        <Button className={classes.button} variant="contained" color="default" onClick={submit}>
          Submit
        </Button>
        {keyStatus === KeyStatus.Invalid && <h4 style={invalidText}>Invalid key</h4>}
      </form>
    </div>
  );
};

export default ApiKeyScreen;
