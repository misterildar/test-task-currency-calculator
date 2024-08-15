import { FC } from "react";

import useDevice from "../../hooks/use-device";
import { POPULAR_CURRENCIES } from "../../utils/constants";
import { CurrencyConverterProps } from "../../utils/types";
import CurrencyInput from "../currency-input/CurrencyInput";

import styles from "./styles.module.scss";

const CurrencyConverter: FC<CurrencyConverterProps> = ({ state, handlers }) => {
  const device = useDevice();

  const styleInput =
    device === "desktop" ? styles.converter__desktop : styles.converter__mobile;

  const styleReverse = device === "desktop" ? "\u21C4" : "\u21C5";

  return (
    <div className={styleInput}>
      <CurrencyInput
        label="У меня есть"
        amount={state.amount}
        onAmountChange={handlers.handleAmountChange}
        currencies={POPULAR_CURRENCIES}
        selectedCurrency={state.fromCurrency}
        onCurrencyChange={handlers.setFromCurrency}
      />
      <button
        onClick={handlers.swapCurrencies}
        className={styles.converter__swap}
      >
        {styleReverse}
      </button>
      <CurrencyInput
        label="Хочу приобрести"
        amount={Number((state.amount * (state.exchangeRate || 0)).toFixed(2))}
        onAmountChange={() => {}}
        readOnly
        currencies={POPULAR_CURRENCIES}
        selectedCurrency={state.toCurrency}
        onCurrencyChange={handlers.setToCurrency}
      />
    </div>
  );
};

export default CurrencyConverter;
