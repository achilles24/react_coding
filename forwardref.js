import React, { useRef, forwardRef } from 'react';
import './style.css';

export default function App() {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.focus();
    inputRef.current.value = 'prakash';
  };

  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>
      <Child ref={inputRef} value="sample" />
      <div>
        <button onClick={handleClick}>focus</button>
      </div>
    </div>
  );
}

const Child = forwardRef(({ value }, inputRef) => {
  return (
    <>
      <p>{value}</p>
      <input ref={inputRef} />
    </>
  );
});
