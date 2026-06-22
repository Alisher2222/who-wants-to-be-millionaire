import type { ButtonOptions } from "../../../../types";
import Option from "../Option";
import styles from "./OptionList.module.css";

type OptionListProps = {
  setOptionText: (optionChange: ButtonOptions, text: string) => void;
  getOptionText: (option: ButtonOptions) => string;
  getRightOption: () => ButtonOptions;
  setRightQuestion: (newRightOption: ButtonOptions) => void;
};

const OptionList = ({
  setOptionText,
  getOptionText,
  getRightOption,
  setRightQuestion,
}: OptionListProps) => {
  const options: ButtonOptions[] = ["A", "B", "C", "D"];
  return (
    <ul className={styles.options}>
      {options.map((buttonOption) => (
        <Option
          key={`optionID-${buttonOption}`}
          option={buttonOption}
          setOptionText={setOptionText}
          getOptionText={getOptionText}
          getRightOption={getRightOption}
          setRightQuestion={setRightQuestion}
        />
      ))}
    </ul>
  );
};

export default OptionList;
