import { useRef, useLayoutEffect } from 'react';

export const useLatest = <Value>(value: Value) => {
  const valueRef = useRef(value);

  useLayoutEffect(() => {
    valueRef.current = value;
  });

  return valueRef;
};
