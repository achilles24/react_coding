// App.js
import React, { useRef } from 'react';
import CustomInput from './CustomInput';
import './style.css';

export default function App() {
  const inputRef = useRef(null);

  const setFocus = () => {
    inputRef.current.focus();
  };

  const clearInput = () => {
    inputRef.current.clear();
  };

  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <CustomInput ref={inputRef} />
      <button onClick={setFocus}>Focus</button>
      <button onClick={clearInput}>Clear</button>
    </div>
  );
}

// CustomInput.js
import React, { forwardRef, useImperativeHandle, useRef } from 'react';

export default forwardRef(function CustomInput(props, inputRef) {
  const ref = useRef(null);

  useImperativeHandle(
    inputRef,
    () => {
      return {
        focus() {
          ref.current.focus();
        },
        clear() {
          ref.current.value = '';
        },
      };
    },
    []
  );
  return <input ref={ref} />;
});
