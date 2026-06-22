import type { IconType } from "react-icons";

export type ButtonOptions = "A" | "B" | "C" | "D";
export type ButtonVariants =
  | "primary"
  | "hint"
  | "back"
  | "modalWindow"
  | "createQuiz"
  | "createQuestion";
export type ButtonIconStyles = {
  size: number;
  color: string;
};

export type ButtonProps = {
  id?: string;
  text?: string;
  event?: () => void;
  option?: ButtonOptions;
  variant?: ButtonVariants;
  icon?: IconType | string;
  iconStyle?: ButtonIconStyles;
  disabled?: boolean;
};

export type PrizeItemProps = {
  num: number;
  sum: number;
  variant: "standard" | "checkpoint" | "current";
  currency?: string;
};

export type QuestionType = {
  index?: number;
  options: ButtonProps[];
  question: string;
  rightOption: ButtonOptions;
};

export type HintOptions = "fiftyFifty" | "askTheAudience" | "callFriend";

export type HintType = {
  id: HintOptions;
  isUsed: boolean;
};

export type LocalStorageType = {
  questions: QuestionType[];
  time: number;
  hintState: (HintType & ButtonProps)[];
  currentPrize: number;
  intervalId?: number;
  description: string;
  title: string;
};

export type LocalStorageKeyType = keyof LocalStorageType;

export type LocalStorageValueType = LocalStorageType[LocalStorageKeyType];

export type UseLocalProps<K extends LocalStorageKeyType> = {
  key: K;
  id: string;
  defaultValue: LocalStorageType[K];
};

export type TimerType = {
  time: number;
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
};

export type AudioType =
  | "correct"
  | "failure"
  | "beginning"
  | "callFriend"
  | "win"
  | "fiftyFifty"
  | "audienceHelp";

export type BarChartType = {
  name: string;
  value: number;
};

export type QuizCardType = {
  id: string;
  title: string;
  description: string;
};
