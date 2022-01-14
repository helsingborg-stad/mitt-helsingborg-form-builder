import {
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { createAWSFormRepository } from '../repositories/aws-form-repository';
import { createConsoleLoggingRepository } from '../repositories/console-logging-form-repository';
import { createLocalStorageFormRepository } from '../repositories/local-storage-form-repository';
import { FormRepository } from '../types/FormRepository';

const LSKEY_API_KEY = 'hbg-forms-apikey';

type ConnectAction = (repository: FormRepository) => void;
interface PropType {
  connect: ConnectAction;
}

const decorateRepository = ({ debug }: { debug: boolean }, repository: FormRepository) =>
  debug ? createConsoleLoggingRepository(repository) : repository;

const ConnectLocalCard: React.FC<PropType> = ({ connect }) => {
  const [debug, setDebug] = useState(false);
  const connectLocal = () => connect(decorateRepository({ debug }, createLocalStorageFormRepository()));
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Use local storage in this browser
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox value={debug} onChange={(event) => setDebug(event.target.checked)} />}
            label="Log calls to console"
          />
        </FormGroup>
      </CardContent>
      <CardActions>
        <Button onClick={connectLocal}>Connect</Button>
      </CardActions>
    </Card>
  );
};

const ConnectAWSCard: React.FC<PropType> = ({ connect }) => {
  // the endpoint not editable due to compatibility reasons with master branch
  const endpoint = process.env.REACT_APP_MITTHELSINGBORG_IO;
  const [apiKey, setApiKey] = useState(localStorage.getItem(LSKEY_API_KEY) || '');
  const [debug, setDebug] = useState(false);

  const connectAWS = () => {
    // remember user input across sessions
    localStorage.setItem(LSKEY_API_KEY, apiKey);
    connect(decorateRepository({ debug }, createAWSFormRepository(apiKey)));
  };

  const canConnect = apiKey && endpoint;
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Connect to AWS
        </Typography>
        <FormGroup>
          <TextField label="Endpoint" variant="outlined" disabled value={endpoint} />
          <TextField
            label="API Key"
            variant="outlined"
            value={apiKey}
            onChange={(event) => setApiKey(event.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox value={debug} onChange={(event) => setDebug(event.target.checked)} />}
            label="Log calls to console"
          />
        </FormGroup>

      </CardContent>
      <CardActions>
        <Button onClick={connectAWS} disabled={!canConnect}>
          Connect
        </Button>
      </CardActions>
    </Card>
  );
};

const ConnectRepositoryScreen: React.FC<PropType> = ({ connect }) => {
  return (
    <div>
      <ConnectLocalCard connect={connect} />
      <ConnectAWSCard connect={connect} />
    </div>
  );
};
export default ConnectRepositoryScreen;
