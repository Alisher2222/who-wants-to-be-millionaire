import type { Dispatch, SetStateAction } from "react";
import type {
  ButtonProps,
  HintType,
  HintOptions,
  QuestionType,
} from "../types";
import { playAudio } from "./audio";

type HintHelperProps = {
  hintId: HintOptions;
  hintState: (HintType & ButtonProps)[];
  setHintState: Dispatch<SetStateAction<(HintType & ButtonProps)[]>>;
  openAskTheAudience: () => void;
  openCallFriend: () => void;
  question: QuestionType;
  setQuestions: Dispatch<SetStateAction<QuestionType[]>>;
};

const applyFiftyFiftyHint = (
  question: QuestionType,
  setQuestions: Dispatch<SetStateAction<QuestionType[]>>,
) => {
  let counter = 2;

  const newOption = question.options.map((item) => {
    if (item.option !== question.rightOption && counter > 0) {
      counter--;
      return { ...item, disabled: true };
    }
    return item;
  });

  setQuestions((prev) => {
    const newQuestions = prev.map((item) => {
      if (item.question === question.question) {
        return { ...item, options: newOption };
      }
      return item;
    });

    return newQuestions;
  });
  playAudio("fiftyFifty");
};

export const hintHelper = ({
  hintId,
  hintState,
  setHintState,
  openAskTheAudience,
  openCallFriend,
  question,
  setQuestions,
}: HintHelperProps) => {
  const newHintState = hintState.map((hint) => {
    if (hint.id === hintId) {
      return { ...hint, isUsed: true };
    }

    return hint;
  });

  setHintState(newHintState);

  switch (hintId) {
    case "fiftyFifty":
      applyFiftyFiftyHint(question, setQuestions);
      break;
    case "askTheAudience":
      openAskTheAudience();
      playAudio("audienceHelp");
      break;
    case "callFriend":
      openCallFriend();
      playAudio("callFriend");
      break;
  }
};
