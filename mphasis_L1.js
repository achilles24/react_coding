import React, { useState, useEffect, useRef } from 'react';
import './style.css';

export default function App() {
  const [count, setCount] = useState(0);
  const timerRef = useRef(null);

  const handleStart = () => {
    timerRef.current = setInterval(() => {
      setCount(prev => prev + 1);
    }, 1000)
  }

  const handleStop = () => {
    clearInterval(timerRef.current);
  }

  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <p>{count}</p>
      <div>
        <button onClick={handleStart}>Start</button>
        <button onClick={handleStop}>Stop</button>
      </div>
    </div>
  );
}

// import React, { useState, useEffect, useRef } from 'react';
// import './style.css';
 
// export default function App() {
//   const [step, setStep] = useState(0);
//   const timerRef = useRef(null);
 
//   if (step == 5) {
//     clearInterval(timerRef.current);
//   }
 
//   useEffect(() => {
//     timerRef.current = setInterval(() => {
//       setStep((prev) => prev + 1);
//     }, 2000);
 
//     return () => {
//       clearInterval(timerRef.current);
//     };
//   }, []);
 
//   return (
//     <div>
//       <h1>Hello StackBlitz!</h1>
//       <p>{step}</p>
//     </div>
//   );
// }
