import styles from "./HintButtons.module.css";
import Button from "../../../../components/Button";
import { useGame } from "../../../../customHooks/useGame";
import { hintHelper } from "../../../../utils/hintHelper";
import type { QuestionType } from "../../../../types";

const HintButtons = (props: QuestionType) => {
  const {
    hintState,
    setHintState,
    openAskTheAudience,
    openCallFriend,
    setQuestions,
    stopTimer,
  } = useGame();

  return (
    <ul className={styles.hintButtonsList}>
      {hintState.map((item) => (
        <li key={item.id}>
          <Button
            icon={item.icon}
            disabled={item.isUsed}
            variant={item.variant}
            iconStyle={item.iconStyle}
            event={() => {
              hintHelper({
                question: props,
                hintId: item.id,
                hintState,
                setHintState,
                openAskTheAudience,
                openCallFriend,
                setQuestions,
              });
              if (item.id !== "fiftyFifty") stopTimer();
            }}
          />
        </li>
      ))}
    </ul>
  );
};

export default HintButtons;
