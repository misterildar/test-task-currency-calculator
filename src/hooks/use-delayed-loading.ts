import { useEffect, useState } from "react";

const useDelayedLoading = (isLoading: boolean, delay: number = 1500) => {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (isLoading) {
      timer = setTimeout(() => {
        setShowLoader(true);
      }, delay);
    } else {
      setShowLoader(false);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isLoading, delay]);

  return showLoader;
};

export default useDelayedLoading;
