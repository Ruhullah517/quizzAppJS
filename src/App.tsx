import React, { useState } from 'react';
import QuestionCard from './components/questionCard';
import { FetchData } from './API';
import { QuestionState, Difficulty } from './API';
import { GlobalStyle, Wrapper } from './App.styles';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const Total_Questions = 10;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startQuiz = async () => {
    setNumber(0);
    setLoading(true);
    setGameOver(false);
    const newQuestions = await FetchData(Total_Questions, Difficulty.EASY);
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      if (correct) {
        setScore((prevScore) => prevScore + 1);
      }
      const answerObject: AnswerObject = {
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
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>Quiz App</h1>
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
        {!gameOver && !loading && userAnswers.length >= 1 && number !== Total_Questions - 1 && (
          <button className="next" onClick={nextQuestion}>
            Next
          </button>
        )}
      </Wrapper>
    </>
  );
};

export default App;
