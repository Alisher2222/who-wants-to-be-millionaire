import PrizeItem from "../PrizeItem";
import styles from "./PrizeList.module.css";
import { listPrizes, currency } from "../../../../constants/prizeInfo";

const PrizeList = () => {
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
    </ul>
  );
};

export default PrizeList;
