import type { IconType } from "react-icons";
import styles from "./Field.module.css";
import type { Dispatch, SetStateAction } from "react";
import type { ButtonOptions } from "../../types";

type FieldType = "text" | "number";
type FieldValueType<T extends FieldType> = T extends "number" ? number : string;

type FieldParams<T extends FieldType> = {
  type: T;
  value: FieldValueType<T>;
  setValue?: Dispatch<SetStateAction<FieldValueType<T>>>;
  setOptionText?: (optionChange: ButtonOptions, text: string) => void;
  option?: ButtonOptions;
  text: string;
  id: string;
  labelDescription: string;
  isLabelVisible: boolean;
  icon?: IconType;
  variant:
    | "filterField"
    | "optionField"
    | "questionField"
    | "questionFieldRight"
    | "generalInfoField";
  disabled?: boolean;
};

const Field = <TValue extends FieldType>({
  type,
  text,
  icon: Icon,
  id,
  labelDescription,
  isLabelVisible,
  variant,
  value,
  setValue,
  setOptionText,
  option,
  disabled,
}: FieldParams<TValue>) => {
  return (
    <>
      <label
        className={`${isLabelVisible ? "" : "hide"} ${styles.label}`}
        htmlFor={id}
      >
        {labelDescription}
      </label>
      <div className={styles[variant]}>
        {Icon && <Icon className={styles.field__icon} />}

        <input
          disabled={disabled}
          type={type}
          placeholder={text}
          className={styles.field__input}
          id={id}
          value={value}
          onChange={(event) => {
            if (setValue) {
              if (type === "number") {
                setValue(Number(event.target.value) as FieldValueType<TValue>);
              } else {
                setValue(event.target.value as FieldValueType<TValue>);
              }
            } else if (setOptionText && option) {
              setOptionText(option, event.target.value);
            }
          }}
        />
      </div>
    </>
  );
};

export default Field;
