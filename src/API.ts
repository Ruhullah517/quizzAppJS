

export type Question = {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string;
}

export type QuestionState = Question & { answers: string[] }

export enum Difficulty {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard"
}

const ShuffleArray = (item: any[]) => ([...item].sort(() => Math.random() - 0.5))

export const FetchData = async (amount: number, difficulty: Difficulty) => {

    const dataLink = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
    const data = await (await fetch(dataLink)).json();
    // console.log(data);
    return data.results.map((question: Question) => (
        {
            ...question,
            answers: ShuffleArray([...question.incorrect_answers, question.correct_answer])
        }
    ))
}
