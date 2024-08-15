import { useState, useEffect, useCallback, ChangeEvent } from "react";

import { State } from "../utils/types";

export const useCurrencyConverter = () => {
  const [state, setState] = useState<State>({
    fromCurrency: "RUB",
    toCurrency: "USD",
    amount: 0,
    currencies: [],
    exchangeRate: null,
    isLoading: false,
    error: null,
  });

  const fetchCurrencies = useCallback(async () => {
    setState((prev: State) => ({ ...prev, isLoading: true, error: null }));
    try {
      const response = await fetch(
        "https://api.exchangerate-api.com/v4/latest/RUB"
      );
      const data = await response.json();
      setState((prev: State) => ({
        ...prev,
        currencies: Object.keys(data.rates),
        isLoading: false,
      }));
    } catch (error: unknown) {
      setState((prev: State) => ({
        ...prev,
        error: "Ошибка при загрузке валют",
        isLoading: false,
      }));
      console.error("Error fetching currencies:", error);
    }
  }, []);

  const fetchExchangeRate = useCallback(async () => {
    const { fromCurrency, toCurrency } = state;
    setState((prev: State) => ({ ...prev, isLoading: true, error: null }));
    try {
      const response = await fetch(
        `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
      );
      const data = await response.json();
      setState((prev: State) => ({
        ...prev,
        exchangeRate: data.rates[toCurrency],
        isLoading: false,
      }));
    } catch (error: unknown) {
      setState((prev: State) => ({
        ...prev,
        error: "Ошибка при получении курса обмена",
        isLoading: false,
      }));
      console.error("Error fetching exchange rate:", error);
    }
  }, [state.fromCurrency, state.toCurrency]);

  useEffect(() => {
    fetchCurrencies();
  }, [fetchCurrencies]);

  useEffect(() => {
    if (state.fromCurrency && state.toCurrency) {
      fetchExchangeRate();
    }
  }, [state.fromCurrency, state.toCurrency, fetchExchangeRate]);

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState((prev: State) => ({ ...prev, amount: Number(e.target.value) }));
  };

  const swapCurrencies = () => {
    setState((prev: State) => ({
      ...prev,
      fromCurrency: prev.toCurrency,
      toCurrency: prev.fromCurrency,
    }));
  };

  const setFromCurrency = (currency: string) => {
    setState((prev: State) => ({ ...prev, fromCurrency: currency }));
  };

  const setToCurrency = (currency: string) => {
    setState((prev: State) => ({ ...prev, toCurrency: currency }));
  };

  return {
    state,
    handleAmountChange,
    swapCurrencies,
    setFromCurrency,
    setToCurrency,
  };
};

export default useCurrencyConverter;
