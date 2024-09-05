// App.js
import React from 'react';
import Quiz from './Quiz.js';
import quizData from './quiz.json';
import './style.css';

export default function App() {
  return (
    <div>
      <Quiz quiz_questions={quizData.quiz_questions} />
    </div>
  );
}

// Quiz.js
import React, { useState } from 'react';
import QuizQuestion from './QuizQuestion.js';
import QuizEnd from './QuizEnd.js';

const Quiz = ({ quiz_questions }) => {
  const [currentPosition, setCurrentPosition] = useState(1);
  const isQuizEnd = quiz_questions.length === currentPosition - 1;

  const moveNext = () => {
    setCurrentPosition((prev) => prev + 1);
  };

  const reset = (e) => {
    e.preventDefault();
    setCurrentPosition(1);
  };

  return (
    <>
      {isQuizEnd ? (
        <QuizEnd resetQuiz={reset} />
      ) : (
        <QuizQuestion
          question={quiz_questions[currentPosition - 1]}
          moveNextQuestion={moveNext}
        />
      )}
    </>
  );
};

export default Quiz;

// QuizQuestion.js
import React, { useState } from 'react';
import QuizQuestionButton from './QuizQuestionButton.js';

const QuizQuestion = ({ question, moveNextQuestion }) => {
  const [error, setError] = useState(false);

  const checkAnswer = (selectedAnswer) => {
    if (selectedAnswer === question.answer) {
      setError(false);
      moveNextQuestion();
    } else {
      setError(true);
    }
  };

  return (
    <>
      <p>{question.instruction_text}</p>
      <ul>
        {question.answer_options.map((answer, index) => {
          return (
            <QuizQuestionButton
              key={index}
              answer={answer}
              handleBtnClick={() => checkAnswer(answer)}
            />
          );
        })}
      </ul>
      {error ? <p style={{ color: 'red' }}>Wrong answer :(</p> : null}
    </>
  );
};

export default QuizQuestion;

// QuizQuestionButton.js
import React from 'react';

const QuizQuestionButton = ({ answer, handleBtnClick }) => {
  return (
    <li>
      <button onClick={handleBtnClick}>{answer}</button>
    </li>
  );
};

export default QuizQuestionButton;

// QuizEnd.js
import React from "react";

const QuizEnd = ({ resetQuiz }) => {
  return (
    <>
      <p>Well Done!</p>
      <a href="" onClick={resetQuiz}>reset Quiz</a>
    </>
  )
}

export default QuizEnd;

// quizData.json
{
  "quiz_questions": [
    {
      "id": 1,
      "instruction_text": "How many continents are there on Planet Earth?",
      "answer_options": ["5", "6", "7", "8"],
      "answer": "7"
    },
    {
      "id": 2,
      "instruction_text": "What's your favorite number?",
      "answer_options": ["1", "2", "3", "4"],
      "answer": "4"
    }
  ]
}
