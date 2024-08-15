import { FC } from "react";

import useAdditionalRates from "../../hooks/use-additional-rates";
import AdditionalRates from "../add-itional-rates/AdditionalRates";
import useCurrencyConverter from "../../hooks/use-currency-converter";
import ErrorMessage from "../../components/error-message/ErrorMessage";
import CurrencyConverter from "../currency-converter/CurrencyConverter";
import useDelayedLoading from "../../hooks/use-delayed-loading";

import styles from "./styles.module.scss";

const App: FC = () => {
  const { state, ...handlers } = useCurrencyConverter();
  const additionalRates = useAdditionalRates();
  const showLoader = useDelayedLoading(state.isLoading);

  return (
    <div className={styles.app}>
      <div className={styles.content}>
        <AdditionalRates rates={additionalRates} />
        <h1 className={styles.content__title}>Конвертер валют</h1>
        <CurrencyConverter state={state} handlers={handlers} />
        {showLoader && <p className={styles.content__loading}>Загрузка...</p>}
        <ErrorMessage message={state.error} />
        <h2>Тестовое задание для Маркгрупп</h2>
      </div>
    </div>
  );
};

export default App;
