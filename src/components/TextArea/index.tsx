import type { ChangeEvent } from "react";
import styles from "./TextArea.module.css";

interface TextAreaProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholderText: string;
  labelDescription: string;
  isLabelVisible: boolean;
  disabled?: boolean;
}

const TextArea = ({
  id,
  value,
  onChange,
  placeholderText,
  labelDescription,
  isLabelVisible,
  disabled,
}: TextAreaProps) => {
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  return (
    <>
      <label
        className={`${isLabelVisible ? "" : styles.hidden} ${styles.label}`}
        htmlFor={id}
      >
        {labelDescription}
      </label>

      <textarea
        id={id}
        className={styles.textArea}
        placeholder={placeholderText}
        value={value}
        onChange={handleChange}
        disabled={disabled}
      />
    </>
  );
};

export default TextArea;
