import styles from "./Lobby.module.css";
import Card from "./components/Card";
import Button from "../../components/Button";
import { useState } from "react";
import { getCardData } from "../../utils/storage";
import { CiCirclePlus } from "react-icons/ci";
import { useNavigate } from "react-router";

const Lobby = () => {
  const [cardData] = useState(() => getCardData());
  const navigate = useNavigate();

  return (
    <div className={styles.lobby}>
      <div className={`${styles.lobby__content} container`}>
        <h1 className={styles.lobby__heading}>Выберите квиз для игры</h1>

        <div className={styles.lobby__cardsContainer}>
          {cardData.map((card) => (
            <Card
              key={card.id}
              heading={card.title}
              description={card.description}
              quizId={card.id}
            />
          ))}
        </div>
        <Button
          variant="createQuiz"
          text="Создать новый квиз"
          icon={CiCirclePlus}
          iconStyle={{ size: 32, color: "white" }}
          event={() => navigate("/quiz/new")}
        />
      </div>
    </div>
  );
};

export default Lobby;
