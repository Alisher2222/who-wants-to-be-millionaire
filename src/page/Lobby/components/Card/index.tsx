import styles from "./Card.module.css";
import { Link } from "react-router";
import Preview from "../../../../assets/preview.png";

type CardParams = {
  heading: string;
  description?: string;
  quizId: string;
};

const Card = ({ heading, description, quizId }: CardParams) => {
  return (
    <article className={styles.card}>
      <img src={Preview} alt="preview" className={styles.card__previewImg} />
      <h2 className={styles.card__heading}>{heading}</h2>
      <p className={styles.card__description}>{description}</p>
      <Link to={`/quiz/${quizId}`} className={styles.card__link}>
        Начать игру
      </Link>
    </article>
  );
};

export default Card;
