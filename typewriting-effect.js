import React, { useState, useEffect, useRef } from 'react';

const para =
  `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
  when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, 
  remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
  and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;

export default function App() {
  const [answer, setAnswer] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef();

  useEffect(() => {
    let words = para.split(' ');
    if (currentIndex < words.length) {
      timerRef.current = setTimeout(() => {
        setAnswer((prev) => `${prev} ${words[currentIndex]}`);
        setCurrentIndex((prevIdx) => prevIdx + 1);
      }, 100);
    }
    return () => {
      clearTimeout(timerRef.current);
    };
  }, [currentIndex, answer]);

  const handleStop = () => {
    clearTimeout(timerRef.current);
  };

  return (
    <div>
      <button onClick={handleStop}>Stop X</button>
      <p>{answer}</p>
    </div>
  );
}
