import React from "react";
import { AnswerObject } from "../App";
import { Wrapper, ButtonWrapper } from "./questionCard.styles";

type Props = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    useranswer: AnswerObject | undefined;
    questionNum: number;
    totalQuestions: number;

}

const QuestionCard: React.FC<Props> = ({ question, answers, callback, useranswer, questionNum, totalQuestions }) => {


    return <>
        <Wrapper>
            <p className="number">
                Question: {questionNum} / {totalQuestions}
            </p>
            <p dangerouslySetInnerHTML={{ __html: question }} />
            <div>
                {answers.map((answer, index) => (
                    <ButtonWrapper key={index}
                        correct={useranswer?.correctAnswer === answer}
                        userClicked={useranswer?.answer === answer}
                    >
                        <button disabled={useranswer ? true : false} value={answer} onClick={callback}>
                            <span dangerouslySetInnerHTML={{ __html: answer }} />
                        </button>
                    </ButtonWrapper>
                ))}
            </div>
        </Wrapper >
    </>
};


export default QuestionCard;

