import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import CSS from 'csstype';
import FormBuilderScreen from './Screens/FormBuilderScreen';
import FormListScreen from './Screens/FormListScreen';

const container: CSS.Properties = {
  margin:'50px',
  padding:'20px',
};

const App: React.FC = () => {

  return (
    <Router>
      <div style={container}>
        <pre>api url: {process.env.REACT_APP_MITTHELSINGBORG_IO} </pre>

        

        <Switch>
          <Route path='/edit/:id'>
            <FormBuilderScreen/>     
          </Route>
          <Route path='/'>
            <FormListScreen />   
          </Route>


        </Switch>
      </div>
    </Router>
  )
}

export default App;
