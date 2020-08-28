import React, { useState, useEffect } from 'react';
import CSS from 'csstype';
import ApiKeyScreen, { KeyStatus } from './screens/ApiKeyScreen';
import { FormProvider } from './contexts/FormContext';
import { getAllForms } from './helpers/ApiRequest';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import RootNavigator from './navigator/rootNavigator';

const container: CSS.Properties = {
  paddingTop: '40px',
  paddingBottom: '30px',
  marginLeft: 'auto',
  marginRight: 'auto',
  padding: '20px',
  maxWidth: '800px',
};

const App: React.FC = () => {
  const [keyStatus, setKeyStatus] = useState(KeyStatus.Loading);
  const [apikey, setApikey] = useState('');

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: 'dark',
        },
      }),
    [],
  );

  const checkApiKey = async (apiKey: string) => {
    const resp = await getAllForms(apiKey);
    if (resp instanceof Error) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    const keyLocalStorage = localStorage.getItem('hbg-forms-apikey');
    if (keyLocalStorage && keyLocalStorage !== '') {
      checkApiKey(keyLocalStorage).then((keyValid) => {
        if (keyValid) {
          setKeyStatus(KeyStatus.Valid);
        } else {
          setKeyStatus(KeyStatus.Invalid);
        }
      });
    } else {
      setKeyStatus(KeyStatus.NotProvided);
    }
  }, []);

  useEffect(() => {
    if (apikey !== '') {
      checkApiKey(apikey).then((keyValid) => {
        if (keyValid) {
          setKeyStatus(KeyStatus.Valid);
          localStorage.setItem('hbg-forms-apikey', apikey);
        } else {
          setKeyStatus(KeyStatus.Invalid);
        }
      });
    }
  }, [apikey]);

  const componentSwitcher = () => {
    switch (keyStatus) {
      case KeyStatus.Loading:
        return <h3>Loading...</h3>;

      case KeyStatus.NotProvided:
      case KeyStatus.Invalid:
        return <ApiKeyScreen keyStatus={keyStatus} setApikey={setApikey} />;

      case KeyStatus.Valid:
        return <RootNavigator />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <FormProvider>
        <div style={container}>
          <pre>api url: {process.env.REACT_APP_MITTHELSINGBORG_IO} </pre>
          {componentSwitcher()}
        </div>
      </FormProvider>
    </ThemeProvider>
  );
};

export default App;
