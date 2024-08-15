export interface State {
  fromCurrency: string;
  toCurrency: string;
  amount: number;
  currencies: string[];
  exchangeRate: number | null;
  isLoading: boolean;
  error: string | null;
}
export interface ErrorMessageProps {
  message: string | null;
}

export interface AdditionalRates {
  USD: number | null;
  EUR: number | null;
  CNY: number | null;
}

export interface AdditionalRatesProps {
  rates: {
    USD: number | null;
    EUR: number | null;
    CNY: number | null;
  };
}

export interface CurrencyInputProps {
  label: string;
  amount: number;
  onAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  currencies: string[];
  selectedCurrency: string;
  onCurrencyChange: (currency: string) => void;
  readOnly?: boolean;
}

export interface CurrencyConverterProps {
  state: State;
  handlers: {
    handleAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setFromCurrency: (currency: string) => void;
    setToCurrency: (currency: string) => void;
    swapCurrencies: () => void;
  };
}
