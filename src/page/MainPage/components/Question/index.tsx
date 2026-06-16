import styles from "./Question.module.css";

type QuestionProps = {
  text: string;
};

const Question = ({ text }: QuestionProps) => {
  return (
    <div className={`${styles.question} container flex-center`}>{text}</div>
  );
};

export default Question;
