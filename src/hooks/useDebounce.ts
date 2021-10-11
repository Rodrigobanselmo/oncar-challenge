import { useEffect, useRef } from "react";

interface IDebounce<T> {
  onDebounce: (value: T) => void;
  onClearDebounce: () => void;
}

export function useDebounce<T>(
  fn: (value: T) => void,
  delay: number
): IDebounce<T> {
  const ref = useRef<number | undefined | null>(null);

  useEffect(() => {
    return () => {
      if (ref.current) window.clearTimeout(ref.current);
    };
  });

  async function onDebounce(value: T): Promise<void> {
    if (ref.current) {
      await window.clearTimeout(ref.current);
    }

    const timeout = await window.setTimeout(() => {
      fn(value);
    }, delay);
    ref.current = timeout;
  }

  function onClearDebounce(): void {
    if (ref.current) window.clearTimeout(ref.current);
  }

  return { onDebounce, onClearDebounce };
}
