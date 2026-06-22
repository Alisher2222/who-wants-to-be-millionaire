import styles from "./Question.module.css";

type QuestionProps = {
  questionNumber: number;
  currentQuestionIndex: number;
  changeCurrentQuestionIndex: (newCurrentQuestionIndex: number) => void;
  heading: string;
};

const Question = ({
  questionNumber,
  currentQuestionIndex,
  changeCurrentQuestionIndex,
  heading,
}: QuestionProps) => {
  return (
    <li
      className={`${styles.question} ${questionNumber === currentQuestionIndex ? styles.onfocus : ""}`}
      onClick={() => changeCurrentQuestionIndex(questionNumber)}
    >
      <p className={styles.question__number}>{questionNumber}</p>
      <button className={styles.question__button}>
        {heading ? heading : "..."}
      </button>
    </li>
  );
};

export default Question;
