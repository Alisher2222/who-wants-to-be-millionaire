import { createContext, useEffect, useState } from "react";
import type { Dispatch, ReactNode } from "react";
import type {
  LocalStorageType,
  TimerType,
  AudioType,
  HintType,
  ButtonProps,
  QuestionType,
} from "../types";
import { useLocal } from "../customHooks/useLocal";
import { quizQuestions } from "../constants/quizQuestions";
import { useTimer } from "../customHooks/useTimer";
import {
  timeDefault,
  hintStateDefault,
  currentPrizeDefault,
} from "../constants/defaultStates";
import { useModalWindow } from "../customHooks/useModalWindow";
import { playAudio, stopAudio, changeVolume } from "../utils/audio";
import { useParams } from "react-router";

type GameContextType = LocalStorageType &
  TimerType & {
    id: string;
    setCurrentPrize: Dispatch<React.SetStateAction<number>>;
    setHintState: Dispatch<React.SetStateAction<(HintType & ButtonProps)[]>>;
    triggerRightAnswerEvents: () => void;
    triggerWrongAnswerEvents: () => void;
    stateSuccessWindow: boolean;
    stateFailureWindow: boolean;
    closeSuccessWindow: () => void;
    closeFailureWindow: () => void;
    openSuccessWindow: () => void;
    openFailureWindow: () => void;
    playAudio: (name: AudioType) => void;
    stopAudio: (name: AudioType) => void;
    changeVolume: (volume: number) => void;
    askTheAudienceWindow: boolean;
    callFriendWindow: boolean;
    closeAskTheAudience: () => void;
    closeCallFriend: () => void;
    openAskTheAudience: () => void;
    openCallFriend: () => void;
    setQuestions: Dispatch<React.SetStateAction<QuestionType[]>>;
    currentQuestion: QuestionType;
    resetQuiz: () => void;
    winWindow: boolean;
    openWinWindow: () => void;
    closeWinWindow: () => void;
  };

export const GameContext = createContext<GameContextType | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const { id } = useParams();

  if (!id) {
    return null;
  }

  const [description] = useLocal({
    key: "description",
    id,
    defaultValue: "...",
  });
  const [title] = useLocal({
    key: "title",
    id,
    defaultValue: "Title",
  });
  const [currentPrize, setCurrentPrize] = useLocal({
    key: "currentPrize",
    id,
    defaultValue: currentPrizeDefault,
  });
  const [questions, setQuestions] = useLocal({
    key: "questions",
    id,
    defaultValue: quizQuestions,
  });
  const [hintState, setHintState] = useLocal({
    key: "hintState",
    id,
    defaultValue: hintStateDefault,
  });
  const { time, startTimer, stopTimer, resetTimer }: TimerType = useTimer(
    id,
    timeDefault,
  );
  const [stateSuccessWindow, openSuccessWindow, closeSuccessWindow] =
    useModalWindow();
  const [stateFailureWindow, openFailureWindow, closeFailureWindow] =
    useModalWindow();
  const [askTheAudienceWindow, openAskTheAudience, closeAskTheAudience] =
    useModalWindow();
  const [callFriendWindow, openCallFriend, closeCallFriend] = useModalWindow();
  const [currentQuestion, setCurrentQuestion] = useState(
    () => questions[currentPrize - 1],
  );

  const [winWindow, openWinWindow, closeWinWindow] = useModalWindow();

  const nextQuestion = () => {
    setCurrentPrize((prev) => prev + 1);
  };

  const triggerRightAnswerEvents = () => {
    nextQuestion();
    resetTimer();
    startTimer();
  };

  const triggerWrongAnswerEvents = () => {
    resetTimer();
    startTimer();
  };

  const resetQuiz = () => {
    setCurrentPrize(1);
    setQuestions((prev) => {
      const newQuestions = prev.map((question) => {
        return {
          ...question,
          options: question.options.map((option) => {
            if (option.disabled) return { ...option, disabled: false };
            return option;
          }),
        };
      });
      return newQuestions;
    });
    setHintState(hintStateDefault);
    resetTimer();
    startTimer();
  };

  useEffect(() => {
    setCurrentQuestion(questions[currentPrize - 1]);
  }, [currentPrize, questions]);

  return (
    <GameContext.Provider
      value={{
        id,
        questions,
        setQuestions,
        currentPrize,
        setCurrentPrize,
        time,
        startTimer,
        stopTimer,
        resetTimer,
        triggerRightAnswerEvents,
        triggerWrongAnswerEvents,
        stateSuccessWindow,
        stateFailureWindow,
        closeSuccessWindow,
        closeFailureWindow,
        openSuccessWindow,
        openFailureWindow,
        playAudio,
        stopAudio,
        changeVolume,
        hintState,
        setHintState,
        askTheAudienceWindow,
        closeAskTheAudience,
        callFriendWindow,
        closeCallFriend,
        openAskTheAudience,
        openCallFriend,
        currentQuestion,
        description,
        title,
        resetQuiz,
        winWindow,
        openWinWindow,
        closeWinWindow,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
