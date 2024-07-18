import React, { useRef, useState } from 'react';
import './style.css';

export default function App() {
  const [timer, setTimer] = useState(0);
  const timerRef = useRef(null);

  const handleStart = () => {
    timerRef.current = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
  };

  const handlePause = () => {
    clearInterval(timerRef.current);
  };

  const handleStop = () => {
    clearInterval(timerRef.current);
    setTimer(0);
  };

  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <p>{timer}</p>
      <button onClick={handleStart}>Start</button>
      <button onClick={handlePause}>Pause</button>
      <button onClick={handleStop}>Stop</button>
    </div>
  );
}
