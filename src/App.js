// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import FormBuilder from './components/FormBuilder';
import ViewForm from './components/ViewForm';
import Form from './components/Form'

const App = () => {
  // Initialize formFields state as an empty array
  const [formFields, setFormFields] = useState([]);

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Form Builder</Link>
            </li>
            <li>
              <Link to="/view">View Form</Link>
            </li>
            <li>
              <Link to="/form">Generated Form</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <FormBuilder
                {...props}
                formFields={formFields}
                setFormFields={setFormFields}
              />
            )}
          />
          <Route
            path="/view"
            render={(props) => <ViewForm {...props} formFields={formFields} />}
          />
          <Route
            path="/form"
            render={(props) => <Form {...props} />}
          />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
