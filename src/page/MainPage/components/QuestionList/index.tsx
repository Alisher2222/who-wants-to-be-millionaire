import styles from "./QuestionList.module.css";
import type { ButtonOptions, ButtonProps } from "../../../../types.ts";
import Button from "../../../../components/Button/index.tsx";
import { useGame } from "../../../../customHooks/useGame.ts";

type QuestionListProps = {
  list: ButtonProps[];
  rightOption: ButtonOptions;
};

const QuestionList = ({ list, rightOption }: QuestionListProps) => {
  const { openSuccessWindow, openFailureWindow, playAudio, stopTimer } =
    useGame();

  const rightOptionActions = () => {
    stopTimer();
    openSuccessWindow();
    playAudio("correct");
  };

  const wrongOptionActions = () => {
    stopTimer();
    openFailureWindow();
    playAudio("failure");
  };

  return (
    <ul className={`${styles.list} container`}>
      {list.map((item) => (
        <li key={`QuestionItem-${item.text}`}>
          <Button
            text={item.text}
            option={item.option}
            disabled={item.disabled}
            event={
              item.option === rightOption
                ? () => {
                    rightOptionActions();
                  }
                : () => {
                    wrongOptionActions();
                  }
            }
          />
        </li>
      ))}
    </ul>
  );
};

export default QuestionList;
