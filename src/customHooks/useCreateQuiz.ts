import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import type { ButtonOptions, QuestionType } from "../types";
import { createStorage, updateState } from "../utils/storage";
import { generateID } from "../utils/generateID";
import { hintStateDefault } from "../constants/defaultStates";

type UseCreateQuizType = {
  setRightQuestion: (newRightOption: ButtonOptions) => void;
  getRightOption: () => ButtonOptions;
  setOptionText: (optionChange: ButtonOptions, text: string) => void;
  getOptionText: (option: ButtonOptions) => string;
  setQuestion: (questionTitle: string) => void;
  getQuestion: () => string;
  currentQuestionIndex: number;
  changeCurrentQuestionIndex: (newCurrentQuestionIndex: number) => void;
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
  quizTitle: string;
  setQuizTitle: Dispatch<SetStateAction<string>>;
  saveCurrentQuestion: () => void;
  saveQuestionsToLocalStorage: () => void;
  questions: QuestionType[];
  isDone: boolean;
};

const defaultCurrentQuestion: QuestionType = {
  question: "",
  rightOption: "A",
  options: [
    { text: "", option: "A" },
    { text: "", option: "B" },
    { text: "", option: "C" },
    { text: "", option: "D" },
  ],
};

export const useCreateQuiz = (): UseCreateQuizType => {
  const [currentQuestion, setCurrentQuestion] = useState<QuestionType>(
    defaultCurrentQuestion,
  );
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(1);
  const [description, setDescription] = useState<string>("");
  const [quizTitle, setQuizTitle] = useState<string>("");
  const [isDone, setIsDone] = useState<boolean>(false);

  const setRightQuestion = (newRightOption: ButtonOptions): void => {
    setCurrentQuestion((prev) => ({ ...prev, rightOption: newRightOption }));
  };

  const getRightOption = (): ButtonOptions => {
    return currentQuestion.rightOption;
  };

  const setOptionText = (optionChange: ButtonOptions, text: string): void => {
    setCurrentQuestion((prev) => ({
      ...prev,
      options: prev.options.map((buttonValue) => {
        if (buttonValue.option === optionChange) {
          return { ...buttonValue, text };
        } else {
          return buttonValue;
        }
      }),
    }));
  };

  const getOptionText = (option: ButtonOptions): string => {
    const result = currentQuestion.options.find(
      (buttonValue) => buttonValue.option === option,
    )?.text;

    if (result) return result;
    return "";
  };

  const setQuestion = (questionTitle: string) => {
    setCurrentQuestion((prev) => ({ ...prev, question: questionTitle }));
  };

  const getQuestion = () => {
    return currentQuestion.question;
  };

  const saveCurrentQuestion = () => {
    if (!currentQuestion.question.trim() || !currentQuestion.rightOption)
      return;

    for (const option of currentQuestion.options) {
      if (!option.text?.trim()) return;
    }

    const targetIndex = currentQuestionIndex - 1;
    const questionExists = !!questions[targetIndex];

    setQuestions((prev) => {
      if (questionExists) {
        const newQuestions = prev.map((question) =>
          question.index === targetIndex ? currentQuestion : question,
        );

        return newQuestions;
      } else {
        return [...prev, { ...currentQuestion, index: targetIndex }];
      }
    });

    if (!questionExists) {
      setCurrentQuestion(defaultCurrentQuestion);
    }
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  const saveQuestionsToLocalStorage = () => {
    if (questions.length !== 15 || !description.trim() || !quizTitle.trim())
      return;

    const id = generateID();
    createStorage(id);
    updateState(id, "currentPrize", 1);
    updateState(id, "description", description);
    updateState(id, "hintState", hintStateDefault);
    updateState(id, "questions", questions);
    updateState(id, "title", quizTitle);
  };

  const changeCurrentQuestionIndex = (newCurrentQuestionIndex: number) => {
    const question = questions[newCurrentQuestionIndex - 1];

    if (question) {
      setCurrentQuestion(question);
    } else {
      setCurrentQuestion(defaultCurrentQuestion);
    }
    setCurrentQuestionIndex(newCurrentQuestionIndex);
  };

  useEffect(() => {
    if (questions.length >= 15 && quizTitle.trim() && description.trim()) {
      setIsDone(true);
    } else {
      setIsDone(false);
    }
  }, [questions, quizTitle, description]);

  return {
    setRightQuestion,
    getRightOption,
    setOptionText,
    getOptionText,
    setQuestion,
    getQuestion,
    currentQuestionIndex,
    changeCurrentQuestionIndex,
    description,
    setDescription,
    quizTitle,
    setQuizTitle,
    saveCurrentQuestion,
    saveQuestionsToLocalStorage,
    questions,
    isDone,
  };
};
