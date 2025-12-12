import { useEffect, useRef } from "react";

/**
 * A custom hook that returns a debounced version of the provided callback function.
 * Allows delaying the execution of the callback until after a specified delay has passed
 * since the last time the debounced function was invoked. Useful for lowering number
 * of API calls and socket emissions.
 *
 * @param {Function} callback - The function to debounce.
 * @param {Number} delay - The delay in milliseconds.
 * @returns {Function} - The debounced function.
 */
export default function useDebounce(callback, delay) {
  const timeoutRef = useRef(null);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  /**
   * The debounced function that delays the execution of the callback.
   * @param  {...any} args - Arguments to pass to the callback function.
   */
  function debouncedFunction(...args) {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callbackRef.current(...args);
    }, delay);
  }

  return debouncedFunction;
}
