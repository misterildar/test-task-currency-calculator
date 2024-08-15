import { FC } from "react";

import { ErrorMessageProps } from "../../utils/types";

import styles from "./styles.module.scss";

const ErrorMessage: FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;
  return <p className={styles.converter__error}>{message}</p>;
};

export default ErrorMessage;
