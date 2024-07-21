// store.js

import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from 'redux';
import { thunk } from 'redux-thunk';

export const counterReducerFn = (state = { count: 0 }, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'INCREMENT':
      return { ...state, count: state.count + payload };
    case 'DECREMENT':
      return { ...state, count: state.count - payload };
    default:
      return { ...state };
  }
};

const authReducerFn = (state = { login: false }, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'LOGIN':
      return { ...state, login: payload };
    default:
      return { ...state };
  }
};

const rootReducer = combineReducers({
  counter: counterReducerFn,
  auth: authReducerFn,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

export default store;

// index.js

import React, { StrictMode } from 'react';
import { Provider } from 'react-redux';
import store from './store.js';
import { createRoot } from 'react-dom/client';

import App from './App';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);

// App.js

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { incrementCount, decrementCount, loginUser } from './action.js';
import './style.css';

export default function App() {
  const counter = useSelector((state) => state.counter.count);
  const login = useSelector((state) => state.auth.login);

  const dispatch = useDispatch();

  const increment = () => {
    dispatch(incrementCount(1));
  };

  const decrement = () => {
    dispatch(decrementCount(1));
  };

  const handleLogin = () => {
    dispatch(loginUser(!login));
  };

  return (
    <div>
      <h1>{counter}</h1>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <div style={{ marginTop: '8px' }}>
        <button onClick={handleLogin}>{!login ? 'Login' : 'Logout'}</button>
      </div>
    </div>
  );
}

// action.js

const incrementCount = (param) => {
  return (dispatch) => {
    dispatch({ type: 'INCREMENT', payload: param });
  };
};

const decrementCount = (param) => {
  return (dispatch) => {
    dispatch({ type: 'DECREMENT', payload: param });
  };
};

const loginUser = (param) => {
  return (dispatch) => {
    dispatch({ type: 'LOGIN', payload: param });
  };
};

export { incrementCount, decrementCount, loginUser };


