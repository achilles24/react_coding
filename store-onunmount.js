// App.jsx
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from 'react-router-dom';

const App = () => {
  const [formData, setFormData] = useState({
    step1Data: '',
    step2Data: '',
    step3Data: '',
  });

  const history = useHistory();

  const handleStepUnmount = (step, data) => {
    setFormData((prevData) => ({
      ...prevData,
      [step]: data,
    }));
  };

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/step1">Step 1</Link>
            </li>
            <li>
              <Link to="/step2">Step 2</Link>
            </li>
            <li>
              <Link to="/step3">Step 3</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/step1">
            <Step1 onSave={(data) => handleStepUnmount('step1Data', data)} />
          </Route>
          <Route path="/step2">
            <Step2 onSave={(data) => handleStepUnmount('step2Data', data)} />
          </Route>
          <Route path="/step3">
            <Step3 onSave={(data) => handleStepUnmount('step3Data', data)} />
          </Route>
        </Switch>

        <div>
          <p>Stored Form Data:</p>
          <pre>{JSON.stringify(formData, null, 2)}</pre>
        </div>
      </div>
    </Router>
  );
};

const Step1 = ({ onSave }) => {
  const [data, setData] = useState('');
  const history = useHistory();

  useEffect(() => {
    return () => {
      console.log("Umnouted");
      onSave(data); // Call onSave when unmounting Step1
    };
  }, [data, onSave]);

  const handleNext = () => {
    history.push('/step2'); // Navigate to next step
  };

  return (
    <div>
      <h2>Step 1</h2>
      <input
        type="text"
        value={data}
        onChange={(e) => setData(e.target.value)}
        placeholder="Enter data for step 1"
      />
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

const Step2 = ({ onSave }) => {
  const [data, setData] = useState('');
  const history = useHistory();

  useEffect(() => {
    return () => {
      console.log("Umnouted");
      onSave(data); // Call onSave when unmounting Step2
    };
  }, [data, onSave]);

  const handleNext = () => {
    history.push('/step3'); // Navigate to next step
  };

  const handlePrev = () => {
    history.push('/step1'); // Navigate back to previous step
  };

  return (
    <div>
      <h2>Step 2</h2>
      <input
        type="text"
        value={data}
        onChange={(e) => setData(e.target.value)}
        placeholder="Enter data for step 2"
      />
      <button onClick={handlePrev}>Previous</button>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

const Step3 = ({ onSave }) => {
  const [data, setData] = useState('');
  const history = useHistory();

  useEffect(() => {
    return () => {
      console.log("Umnouted");
      onSave(data); // Call onSave when unmounting Step3
    };
  }, [data, onSave]);

  const handlePrev = () => {
    history.push('/step2'); // Navigate back to previous step
  };

  const handleSubmit = () => {
    // Final submit logic, if needed
    history.push('/'); // Navigate to home or final page
  };

  return (
    <div>
      <h2>Step 3</h2>
      <input
        type="text"
        value={data}
        onChange={(e) => setData(e.target.value)}
        placeholder="Enter data for step 3"
      />
      <button onClick={handlePrev}>Previous</button>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default App;
