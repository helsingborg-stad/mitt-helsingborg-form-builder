import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FormBuilderScreen from '../screens/FormBuilderScreen';
import FormListScreen from '../screens/FormListScreen';

const RootNavigator: React.FC = () => {
  return (
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
  );
};

export default RootNavigator;
