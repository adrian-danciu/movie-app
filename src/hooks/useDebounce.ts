import { useEffect, useState } from "react";

type Value = {
  title: string;
  year: number | null;
  genre: number | null;
};

export function useDebounce(value: Value, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState<Value>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}
