import styles from "./MainPage.module.css";

import QuestionList from "./components/QuestionList";
import Question from "./components/Question";
import PrizeList from "./components/PrizeList";
import HintButtons from "./components/HintButtons";
import BackAndTime from "./components/BackAndTime";
import ModalWindow from "../../components/ModalWindow";

import MillionaireImg from "../../assets/millionaireImg.png";

import { useGame } from "../../customHooks/useGame";
import { useEffect, useState } from "react";
import { getCallFriendText } from "../../utils/getCallFriendText";
import { getBarChartData } from "../../utils/getBarCharData";

const MainPage = () => {
  const {
    currentQuestion,
    triggerWrongAnswerEvents,
    time,
    startTimer,
    stateFailureWindow,
    closeFailureWindow,
    stateSuccessWindow,
    closeSuccessWindow,
    triggerRightAnswerEvents,
    openFailureWindow,
    playAudio,
    stopAudio,
    changeVolume,
    askTheAudienceWindow,
    closeAskTheAudience,
    callFriendWindow,
    closeCallFriend,
    winWindow,
    closeWinWindow,
    resetQuiz,
  } = useGame();

  const options = currentQuestion.options;
  const rightOption = currentQuestion.rightOption;
  const questionTitle = currentQuestion.question;

  useEffect(() => {
    startTimer();
    changeVolume(0.05);
    playAudio("beginning");
  }, []);

  useEffect(() => {
    if (time === 0) {
      triggerWrongAnswerEvents();
      openFailureWindow();
      playAudio("failure");
    }
  }, [time]);
  const [callFriendText, setCallFriendText] = useState(() =>
    getCallFriendText(rightOption),
  );

  useEffect(() => {
    setCallFriendText(getCallFriendText(rightOption));
  }, [currentQuestion]);

  return (
    <>
      <section className={`${styles.mainPage}`}>
        <div className={`${styles.mainPage__wrapper} container`}>
          <BackAndTime />
          <HintButtons
            question={questionTitle}
            options={options}
            rightOption={rightOption}
          />
          <img
            src={MillionaireImg}
            alt="Who wants to be a MILLIONAIRE"
            className={styles.mainPage__millionaireImg}
          />
          <Question text={questionTitle} />
          <QuestionList list={options} rightOption={rightOption} />
          <PrizeList />
          {stateFailureWindow && (
            <ModalWindow
              heading="Неверный ответ!"
              description="К сожалению, это неправильный ответ. Вы уходите ни с чем. Но в следующий раз обязательно повезёт!"
              event={() => {
                closeFailureWindow();
                triggerWrongAnswerEvents();
              }}
              eventDescription="Продолжить игру"
              buttonVariant="modalWindow"
            />
          )}
          {stateSuccessWindow && (
            <ModalWindow
              heading="Верно!"
              description="Поздравляем! Это правильный ответ. Вы переходите к следующему вопросу"
              event={() => {
                triggerRightAnswerEvents();
                closeSuccessWindow();
              }}
              eventDescription="Продолжить игру"
              buttonVariant="modalWindow"
            />
          )}
          {callFriendWindow && (
            <ModalWindow
              heading="Звонок другу"
              event={() => {
                closeCallFriend();
                startTimer();
              }}
              eventDescription="Продолжить игру"
              buttonVariant="modalWindow"
              description={callFriendText}
            />
          )}
          {askTheAudienceWindow && (
            <ModalWindow
              heading="Помощь зала"
              event={() => {
                closeAskTheAudience();
                stopAudio("audienceHelp");
                startTimer();
              }}
              eventDescription="Продолжить игру"
              buttonVariant="modalWindow"
              data={getBarChartData(rightOption)}
            />
          )}
          {winWindow && (
            <ModalWindow
              heading="Вы выиграли!"
              buttonVariant="modalWindow"
              eventDescription="Перезапустить"
              event={() => {
                closeWinWindow();
                resetQuiz();
              }}
            />
          )}
        </div>
      </section>
    </>
  );
};

export default MainPage;
