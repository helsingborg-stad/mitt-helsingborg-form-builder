import React, { useState, useEffect } from 'react';
import CSS from 'csstype';
import ApiKeyScreen, { KeyStatus } from './screens/ApiKeyScreen';
import { FormProvider } from './contexts/FormContext';
import { getAllForms } from './helpers/ApiRequest';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import RootNavigator from './navigator/rootNavigator';
import { NotificationProvider } from './contexts/NotificationsContext';
import { FormRepositoryProvider } from './contexts/FormRepositoryContext';
import { createConsoleLoggingRepository } from './repositories/console-logging-form-repository';
import { createAWSFormRepository } from './repositories/aws-form-repository';
import { createLocalStorageFormRepository } from './repositories/local-storage-form-repository';
import { FormRepository } from './types/FormRepository';

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
  return createConsoleLoggingRepository(formRepository);
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

  const [formRepository] = useState(createFormRepository())
  return (
    <ThemeProvider theme={theme}>
      <NotificationProvider>
        <FormRepositoryProvider formRepository={formRepository}>
          <FormProvider>
            <div style={container}>
              <div style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: '800px' }}>
                <pre>api url: {process.env.REACT_APP_MITTHELSINGBORG_IO} </pre>
              </div>
              <RootNavigator />
            </div>
          </FormProvider>
        </FormRepositoryProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
};

export default App;
