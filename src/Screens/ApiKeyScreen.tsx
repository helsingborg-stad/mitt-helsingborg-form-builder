import React from 'react';
import CSS from 'csstype';
import { TextField, Button } from '@material-ui/core';

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
  const submit = () => {
    const apikeyInputEl = document.getElementById('apikey') as HTMLInputElement;
    const apikey = apikeyInputEl.value;
    setApikey(apikey);
  };

  return (
    <div>
      <h2>Input api key:</h2>
      <TextField fullWidth multiline rowsMax={3} id="apikey" label="Api key" />
      <Button style={{ margin: '5px' }} variant="contained" color="default" onClick={submit}>
        Submit
      </Button>
      {keyStatus === KeyStatus.Invalid && <h4 style={invalidText}>Invalid key</h4>}
    </div>
  );
};

export default ApiKeyScreen;
