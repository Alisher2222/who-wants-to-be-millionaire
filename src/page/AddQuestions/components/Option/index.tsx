import styles from "./Option.module.css";
import type { ButtonOptions } from "../../../../types";
import Field from "../../../../components/Field";
import { IoIosCheckmark } from "react-icons/io";

type OptionType = {
  option: ButtonOptions;
  setOptionText: (optionChange: ButtonOptions, text: string) => void;
  getOptionText: (option: ButtonOptions) => string;
  getRightOption: () => ButtonOptions;
  setRightQuestion: (newRightOption: ButtonOptions) => void;
};

const Option = ({
  option,
  setOptionText,
  getOptionText,
  getRightOption,
  setRightQuestion,
}: OptionType) => {
  return (
    <li
      className={`${styles.option} ${option === getRightOption() ? styles.checked : ""}`}
    >
      <p className={styles.option__name}>{option}</p>
      <Field
        text={`Вариант ${option}...`}
        type="text"
        id={`option-${option}`}
        labelDescription={`Enter option ${option}`}
        isLabelVisible={false}
        variant={
          getRightOption() === option ? "questionFieldRight" : "questionField"
        }
        value={getOptionText(option)}
        setOptionText={setOptionText}
        option={option}
      />
      <button
        onClick={() => setRightQuestion(option)}
        className={`${styles.option__checkButton} ${getRightOption() === option ? styles.checked : ""}`}
      >
        <IoIosCheckmark
          color={getRightOption() === option ? "#021d3b" : "white"}
          size={60}
        />
      </button>
    </li>
  );
};

export default Option;
