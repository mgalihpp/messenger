import { useEffect, useState } from "react";

/**
 * useDebounce
 *
 * A hook that debounces a value. By default the delay is 500ms.
 *
 * @param value The value to debounce
 * @param delay The delay in ms, defaults to 500
 * @returns The debounced value
 */
function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
