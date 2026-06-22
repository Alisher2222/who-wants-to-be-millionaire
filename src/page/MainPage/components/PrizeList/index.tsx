import PrizeItem from "../PrizeItem";
import styles from "./PrizeList.module.css";
import { listPrizes, currency } from "../../../../constants/prizeInfo";
import { useGame } from "../../../../customHooks/useGame";

const PrizeList = () => {
  const { resetQuiz } = useGame();
  return (
    <ul className={styles.prizeList}>
      {listPrizes.map((item) => (
        <PrizeItem
          key={`PrizeItem-${item.num}`}
          num={item.num}
          sum={item.sum}
          variant={item.variant}
          currency={currency}
        />
      ))}
      <button
        onClick={() => resetQuiz()}
        className={styles.prizeList__resetButton}
      >
        Перезапустить квиз
      </button>
    </ul>
  );
};

export default PrizeList;
