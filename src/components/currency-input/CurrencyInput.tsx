import { FC } from "react";

import { CurrencyInputProps } from "../../utils/types";

import styles from "./styles.module.scss";

const CurrencyInput: FC<CurrencyInputProps> = ({
  label,
  amount,
  onAmountChange,
  currencies,
  selectedCurrency,
  onCurrencyChange,
  readOnly,
}) => (
  <div className={styles.currency}>
    <p>{label}</p>
    <input
      type="number"
      value={amount}
      onChange={onAmountChange}
      readOnly={readOnly}
      className={styles.currency__input}
    />
    <div className={styles.currency__buttons}>
      {currencies.map((currency) => (
        <button
          key={currency}
          onClick={() => onCurrencyChange(currency)}
          className={`${styles.currency__button} ${
            selectedCurrency === currency ? styles.currency__button_active : ""
          }`}
        >
          {currency}
        </button>
      ))}
    </div>
  </div>
);

export default CurrencyInput;
