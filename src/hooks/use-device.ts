import { useState, useEffect, useCallback } from "react";
import {
  MIN_DESKTOP_WIDTH,
  MAX_MOBILE_WIDTH,
  TDevice,
} from "../utils/constants";

const useDevice = (): TDevice => {
  const [width, setWidth] = useState<number>(window.innerWidth);

  const handleResize = useCallback(() => {
    setWidth(window.innerWidth);
  }, []);

  const debouncedResize = useDebounce(handleResize);

  useEffect(() => {
    window.addEventListener("resize", debouncedResize);

    return () => {
      window.removeEventListener("resize", debouncedResize);
    };
  }, [debouncedResize]);

  if (width >= MIN_DESKTOP_WIDTH) return TDevice.DESKTOP;
  if (width <= MAX_MOBILE_WIDTH) return TDevice.MOBILE;
  return TDevice.TABLET;
};

const useDebounce = <T extends (...args: unknown[]) => void>(
  func: T,
  milliseconds: number = 400
): ((...args: Parameters<T>) => void) => {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>): void => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func(...args);
    }, milliseconds);
  };
};

export default useDevice;
