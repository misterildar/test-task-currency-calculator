import { useState, useEffect, useCallback } from "react";

import { AdditionalRates } from "../utils/types";

const useAdditionalRates = () => {
  const [additionalRates, setAdditionalRates] = useState<AdditionalRates>({
    USD: null,
    EUR: null,
    CNY: null,
  });

  const fetchAdditionalRates = useCallback(async () => {
    try {
      const response = await fetch(
        "https://api.exchangerate-api.com/v4/latest/RUB"
      );
      const data = await response.json();
      setAdditionalRates({
        USD: 1 / data.rates.USD,
        EUR: 1 / data.rates.EUR,
        CNY: 1 / data.rates.CNY,
      });
    } catch (error) {
      console.error("Ошибка при получении дополнительных курсов", error);
    }
  }, []);

  useEffect(() => {
    fetchAdditionalRates();
  }, [fetchAdditionalRates]);

  return additionalRates;
};

export default useAdditionalRates;
