import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import CSS from 'csstype';
import FormBuilderScreen from './Screens/FormBuilderScreen';
import FormListScreen from './Screens/FormListScreen';
import {FormProvider} from './Contexts/FormContext';

const container: CSS.Properties = {
  marginTop:'20px',
  marginBottom:'30px',
  marginLeft: 'auto',
  marginRight: 'auto',
  padding:'20px',
  maxWidth:'800px',
};

const App: React.FC = () => {

  return (
    <FormProvider>
      <Router>
        <div style={container}>
          <pre>api url: {process.env.REACT_APP_MITTHELSINGBORG_IO} </pre>

          <Switch>
            <Route exact path='/edit'>
              <FormBuilderScreen/>     
            </Route>
            <Route path='/edit/:id'>
              <FormBuilderScreen/>     
            </Route>
            <Route path='/'>
              <FormListScreen />   
            </Route>
          </Switch>
        </div>
      </Router>
    </FormProvider>
  )
}

export default App;
