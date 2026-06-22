import styles from "./AddQuestions.module.css";
import Field from "../../components/Field";
import { CiStar } from "react-icons/ci";
import { useCreateQuiz } from "../../customHooks/useCreateQuiz";
import TextArea from "../../components/TextArea";
import OptionList from "./components/OptionList";
import Button from "../../components/Button";
import QuestionList from "./components/QuestionList";
import { useNavigate } from "react-router";

const AddQuestion = () => {
  const {
    currentQuestionIndex,
    changeCurrentQuestionIndex,
    quizTitle,
    setQuizTitle,
    description,
    setDescription,
    setOptionText,
    getOptionText,
    getRightOption,
    setRightQuestion,
    saveCurrentQuestion,
    setQuestion,
    getQuestion,
    saveQuestionsToLocalStorage,
    questions,
    isDone,
  } = useCreateQuiz();

  const naviage = useNavigate();

  return (
    <div className={styles.addQuestion}>
      <div className={`container ${styles.addQuestion__content}`}>
        <div className={styles.addQuestion__generalInfo}>
          <div className={`${styles.addQuestion__iconWrapper} flex-center`}>
            <CiStar color="white" size={40} />
          </div>
          <h1 className={styles.addQuestion__heading}>
            who wants to be a <br />
            <span className={styles.addQuestion__headingAccent}>
              Millionaire
            </span>
          </h1>
          <div className={styles.addQuestion__field}>
            <Field
              text="Введите название квиза"
              id="quiz-name"
              labelDescription="Название квиза"
              isLabelVisible={true}
              variant="generalInfoField"
              type="text"
              value={quizTitle}
              setValue={setQuizTitle}
            />
          </div>
          <div className={styles.addQuestion__field}>
            <Field
              text="Введите краткое описание квиза"
              type="text"
              id="quiz-description"
              labelDescription="Описание"
              isLabelVisible={true}
              variant="generalInfoField"
              value={description}
              setValue={setDescription}
            />
          </div>
        </div>
        <div className={styles.addQuestion__questionInfo}>
          <div className={styles.addQuestion__currentQuestion}>
            {currentQuestionIndex <= 15
              ? `Вопрос ${currentQuestionIndex}/15`
              : isDone
                ? "Done!"
                : "Please enter the quiz name and description"}
          </div>
          <TextArea
            placeholderText="Введите текст вопроса..."
            id="question"
            labelDescription="Enter your question"
            isLabelVisible={false}
            value={getQuestion()}
            onChange={setQuestion}
            disabled={currentQuestionIndex > 15}
          />
          <OptionList
            setOptionText={setOptionText}
            getOptionText={getOptionText}
            getRightOption={getRightOption}
            setRightQuestion={setRightQuestion}
          />
          <Button
            text="Сохранить вопрос"
            variant="createQuestion"
            event={saveCurrentQuestion}
          />
          <Button
            text="Сохранить квиз"
            event={() => {
              saveQuestionsToLocalStorage();
              naviage("/");
            }}
            disabled={!isDone}
            variant="createQuestion"
          />
        </div>
        <QuestionList
          currentQuestionIndex={currentQuestionIndex}
          changeCurrentQuestionIndex={changeCurrentQuestionIndex}
          questions={questions}
        />
      </div>
    </div>
  );
};

export default AddQuestion;
