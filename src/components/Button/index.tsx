import styles from "./Button.module.css";
import type { ButtonProps } from "../../types";

const Button = ({
  text,
  event,
  option,
  icon: Icon,
  iconStyle,
  variant = "primary",
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      onClick={event}
      className={`${variant ? styles[variant] : ""} ${disabled ? styles.disabledButton : ""}  `}
      disabled={disabled}
    >
      {Icon &&
        (typeof Icon === "string" ? (
          <p
            style={{
              fontSize: `${iconStyle?.size}px`,
              color: iconStyle?.color,
            }}
          >
            {Icon}
          </p>
        ) : (
          <Icon size={iconStyle?.size} color={iconStyle?.color} />
        ))}
      {option && <span className={styles.primary__option}>{option} </span>}
      {text}
    </button>
  );
};

export default Button;
