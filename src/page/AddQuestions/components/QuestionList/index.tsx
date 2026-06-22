import type { QuestionType } from "../../../../types";
import Question from "../Question";
import styles from "./QuestionList.module.css";

type QuestionListType = {
  currentQuestionIndex: number;
  changeCurrentQuestionIndex: (newCurrentQuestionIndex: number) => void;
  questions: QuestionType[];
};

const QuestionList = ({
  currentQuestionIndex,
  changeCurrentQuestionIndex,
  questions,
}: QuestionListType) => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].reverse();
  return (
    <section className={styles.questionList}>
      <h2 className={styles.questionList__heading}>СПИСОК ВОПРОСОВ</h2>
      <hr />
      <ul className={styles.QuestionList__list}>
        {arr.map((question) => (
          <Question
            questionNumber={question}
            heading={questions[question - 1]?.question}
            key={`questionListId-${question}`}
            currentQuestionIndex={currentQuestionIndex}
            changeCurrentQuestionIndex={changeCurrentQuestionIndex}
          />
        ))}
      </ul>
    </section>
  );
};

export default QuestionList;
