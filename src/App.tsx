import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CSS from 'csstype';
import ApiKeyScreen, { KeyStatus } from './Screens/ApiKeyScreen';
import FormBuilderScreen from './Screens/FormBuilderScreen';
import FormListScreen from './Screens/FormListScreen';
import { FormProvider } from './Contexts/FormContext';
import { getAllForms } from './helpers/ApiRequest';

const container: CSS.Properties = {
  marginTop: '20px',
  marginBottom: '30px',
  marginLeft: 'auto',
  marginRight: 'auto',
  padding: '20px',
  maxWidth: '800px',
};

const App: React.FC = () => {
  const [keyStatus, setKeyStatus] = useState(KeyStatus.Loading);
  const [apikey, setApikey] = useState('');

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
        return (
          <div style={container}>
            <pre>api url: {process.env.REACT_APP_MITTHELSINGBORG_IO} </pre>
            <h1>Loading...</h1>
          </div>
        );

      case KeyStatus.NotProvided:
      case KeyStatus.Invalid:
        return (
          <div style={container}>
            <pre>api url: {process.env.REACT_APP_MITTHELSINGBORG_IO} </pre>
            <ApiKeyScreen setApikey={setApikey} keyStatus={keyStatus} />
          </div>
        );

      case KeyStatus.Valid:
        return (
          <FormProvider>
            <div style={container}>
              <pre>api url: {process.env.REACT_APP_MITTHELSINGBORG_IO} </pre>
              <Router>
                <Switch>
                  <Route exact path="/edit">
                    <FormBuilderScreen />
                  </Route>
                  <Route path="/edit/:id">
                    <FormBuilderScreen />
                  </Route>
                  <Route path="/">
                    <FormListScreen />
                  </Route>
                </Switch>
              </Router>
            </div>
          </FormProvider>
        );
    }
  };

  return componentSwitcher();
};

export default App;
