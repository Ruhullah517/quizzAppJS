/* eslint-disable no-restricted-globals */

import React, { useEffect, useState } from 'react';
import QuestionCard from './components/questionCard';
import { FetchData, QuestionType, Difficulty } from './API';
import { GlobalStyle, Wrapper } from './App.styles';
import './messaging_init_in_sw';

export type AnswerType = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const Total_Questions = 10;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerType[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startQuiz = async () => {
    try {
      setNumber(0);
      setLoading(true);
      setGameOver(false);
      const newQuestions = await FetchData(Total_Questions, Difficulty.EASY);
      setQuestions(newQuestions);
      setScore(0);
      setUserAnswers([]);
      setLoading(false);
      localStorage.setItem("questions", JSON.stringify(newQuestions));
    } catch (error) {
      const collectionData: any = localStorage.getItem("questions");

      setQuestions(JSON.parse(collectionData));
      setLoading(false);
    }
  };


  const [ansSelected, setAnsSelected] = useState<boolean>(false);
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      setAnsSelected(true);
      const correct = questions[number].correct_answer === answer;
      if (correct) {
        setScore((prevScore) => prevScore + 1);
      }
      const answerObject: AnswerType = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prevAnswers) => [...prevAnswers, answerObject]);
    }
  };

  const nextQuestion = () => {
    setNumber((prevNumber) => prevNumber + 1);
    setAnsSelected(false);
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>Quiz App</h1>
        
        {
          (!self.navigator.onLine) &&
          <div style={{ color: 'red' }}><b>You are offline! Please connect to the internet and try again.</b></div>
        }

        {(gameOver || userAnswers.length === Total_Questions) && (
          <button className="start" onClick={startQuiz}>
            {userAnswers.length === 0 ? 'Start' : 'Restart'}
          </button>
        )}
        {!gameOver && <p className="score">Score: {score}</p>}
        {loading && <p>Loading Questions....</p>}
        {!loading && !gameOver && (
          <QuestionCard
            questionNum={number + 1}
            totalQuestions={Total_Questions}
            question={questions[number].question}
            answers={questions[number].answers}
            useranswer={userAnswers[number]}
            callback={checkAnswer}
          />
        )}
        {!gameOver && !loading && userAnswers.length >= 1 && ansSelected == true && number !== Total_Questions - 1 && (
          <button className="next" onClick={nextQuestion}>
            Next
          </button>
        )}
      </Wrapper>
    </>
  );
};

export default App;
function getToken() {
  throw new Error('Function not implemented.');
}

