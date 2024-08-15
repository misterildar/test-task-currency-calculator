import { FC } from "react";

import { AdditionalRatesProps } from "../../utils/types";

import styles from "./styles.module.scss";

const AdditionalRates: FC<AdditionalRatesProps> = ({ rates }) => {
  return (
    <div className={styles.additional}>
      {rates.USD !== null && (
        <p className={styles.additional__rate}>USD {rates.USD.toFixed(2)} </p>
      )}
      {rates.EUR !== null && (
        <p className={styles.additional__rate}>EUR {rates.EUR.toFixed(2)} </p>
      )}
      {rates.CNY !== null && (
        <p className={styles.additional__rate}>CNY {rates.CNY.toFixed(2)} </p>
      )}
    </div>
  );
};

export default AdditionalRates;
