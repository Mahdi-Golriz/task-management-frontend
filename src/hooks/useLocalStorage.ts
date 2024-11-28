import { useEffect, useState } from "react";

interface useLocalStorageStateProps {
  initialState: string;
  key: string;
}

/**
 * A custom hook to manage state synchronized with localStorage.
 * It retrieves the initial value from localStorage if available;
 * otherwise, it initializes the state with the provided default value.
 * @param {Object} props - The properties for the hook.
 * @param {string} props.initialState - The initial state to use if no value is found in localStorage.
 * @param {string} props.key - The key used to store and retrieve the value from localStorage.
 * @returns {[any, Function]} - The current state and a function to update it.
 */

const useLocalStorageState = ({
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

export default useLocalStorageState;
