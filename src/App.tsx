import React, { useState, useEffect } from 'react';
import CSS from 'csstype';
import { FormProvider } from './contexts/FormContext';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import RootNavigator from './navigator/rootNavigator';
import { NotificationProvider } from './contexts/NotificationsContext';
import { FormRepositoryProvider } from './contexts/FormRepositoryContext';
import createLoggingRepository from './repositories/logging-form-repository';
import { createAWSFormRepository } from './repositories/aws-form-repository';
import { createLocalStorageFormRepository } from './repositories/local-storage-form-repository';
import { FormRepository } from './types/FormRepository';
import ConnectRepositoryScreen from './screens/ConnectRepositoryScreen';

const container: CSS.Properties = {
  paddingTop: '40px',
  paddingBottom: '30px',
  marginLeft: 'auto',
  marginRight: 'auto',
  padding: '20px',
};

function createFormRepository(): FormRepository {
  const { AWS_API_KEY: apiKey, REACT_APP_MITTHELSINGBORG_IO: endpoint } = process.env;
  const formRepository = apiKey && endpoint ? createAWSFormRepository(apiKey) : createLocalStorageFormRepository();
  return createLoggingRepository(formRepository);
}
const App: React.FC = () => {
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: 'dark',
        },
      }),
    [],
  );

  // const [formRepository, setFormRepository] = useState<FormRepository>(createFormRepository());
  const [formRepository, setFormRepository] = useState<FormRepository | null>(null);

  // This is the main screen after user has selected a connection
  const renderConnected = (repository: FormRepository) => (
    <FormRepositoryProvider formRepository={repository}>
      <FormProvider>
        <div style={container}>
          <div style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: '800px' }}>
            <pre>api url: {process.env.REACT_APP_MITTHELSINGBORG_IO} </pre>
          </div>
          <RootNavigator />
        </div>
      </FormProvider>
    </FormRepositoryProvider>
  );

  // This is the main screen forcing selection of connection 
  const renderDisconnected = () => <ConnectRepositoryScreen connect={setFormRepository}/>;

  const render = (repository: FormRepository | null) =>
    repository ? renderConnected(repository) : renderDisconnected();

  return (
    <ThemeProvider theme={theme}>
      <NotificationProvider>{render(formRepository)}</NotificationProvider>
    </ThemeProvider>
  );
};

export default App;
