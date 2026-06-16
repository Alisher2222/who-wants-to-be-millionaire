import type { BarChartType, ButtonVariants } from "../../types";
import Button from "../Button";
import styles from "./ModalWindow.module.css";
import { useGame } from "../../customHooks/useGame";
import Confetti from "react-confetti";
import Graph from "../Graph";

type ModalWindowType = {
  heading: string;
  description?: string;
  event?: () => void;
  eventDescription?: string;
  buttonVariant?: ButtonVariants;
  data?: BarChartType[];
};

const ModalWindow = ({
  heading,
  description,
  event,
  eventDescription,
  buttonVariant,
  data,
}: ModalWindowType) => {
  const { stateSuccessWindow } = useGame();

  return (
    <div
      className={`${styles.modalWindow} flex-center ${stateSuccessWindow ? styles.success : ""}`}
    >
      {stateSuccessWindow && <Confetti gravity={0.3} />}
      <div className={styles.modalWindow__content}>
        <p className={styles.modalWindow__heading}>{heading}</p>
        <p className={styles.modalWindow__description}>{description}</p>
        {data && <Graph data={data} />}
        {event && (
          <Button
            text={eventDescription}
            event={event}
            variant={buttonVariant}
          />
        )}
      </div>
    </div>
  );
};

export default ModalWindow;
