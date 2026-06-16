import styles from "./BackAndTime.module.css";
import Button from "../../../../components/Button";
import { FaArrowLeft } from "react-icons/fa6";
import { useGame } from "../../../../customHooks/useGame";
import { secondsToTimeFormat } from "../../../../utils/time";

const BackAndTime = () => {
  const { time } = useGame();
  return (
    <div className={styles.BackAndTime}>
      <div className={styles.BackAndTimeWrapper}>
        <FaArrowLeft size={"25px"} className={styles.icon} />
        <Button text="Назад" variant="back" />
        <div className={`${styles.timeWrapper} flex-center`}>
          {secondsToTimeFormat(time)}
        </div>
      </div>
    </div>
  );
};

export default BackAndTime;
