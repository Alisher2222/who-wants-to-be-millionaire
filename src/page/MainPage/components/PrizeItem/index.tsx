import type { PrizeItemProps } from "../../../../types";
import styles from "./PrizeItem.module.css";
import { useGame } from "../../../../customHooks/useGame";

const PrizeItem = ({ num, sum, variant, currency }: PrizeItemProps) => {
  const { currentPrize } = useGame();
  return (
    <li
      className={`${num === currentPrize ? styles["current"] : styles[variant]} gap`}
    >
      <span>{num}</span>
      <span>{currency}</span>
      {sum}
    </li>
  );
};

export default PrizeItem;
