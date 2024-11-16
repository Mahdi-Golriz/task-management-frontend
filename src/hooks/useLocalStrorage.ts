import { useEffect, useState } from "react";

interface useLocalStorageStateProps {
  initialState: string;
  key: string;
}

export const useLocalStorageState = ({
  initialState,
  key,
}: useLocalStorageStateProps) => {
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
};
