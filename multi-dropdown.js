import React, { useState, useEffect } from 'react';
import './style.css';

const datas = [
  {
    TamilNadu: ['Chennai', 'Madurai', 'Salem'],
  },
  {
    Karnataka: ['Bangalore', 'Mysore', 'Hasan'],
  },
];

export default function App() {
  const [state, setState] = useState('');
  const [city, setCity] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');

  const stateChanges = (e) => {
    setCity([]);
    let selectedState = e.target.value;
    let updatedCities = datas.find(
      (each) => Object.keys(each)[0] === selectedState
    );
    setState(selectedState);
    setCity(updatedCities ? updatedCities[selectedState] : []);
    setSelectedCity('');
  };

  const cityChanges = (e) => {
    let selectedCty = e.target.value;
    setSelectedCity(selectedCty);
  };

  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <select name="states" onChange={stateChanges} value={state}>
        <option value="" hidden>
          Select state
        </option>
        {datas.map((each, i) => {
          return (
            <option key={i} value={Object.keys(each)[0]}>
              {Object.keys(each)[0]}
            </option>
          );
        })}
      </select>
      <select name="cities" onChange={cityChanges} value={selectedCity}>
        <option value="" hidden>
          Select city
        </option>
        {city.map((each) => {
          return <option value={each}>{each}</option>;
        })}
      </select>
    </div>
  );
}
