import React, { useEffect, useRef } from 'react';
import { useDebounce } from './useDebounce';

export const useDebounceEffect = (
  callback: React.EffectCallback,
  deps: React.DependencyList,
  ms: number,
) => {
  const cleanUp = useRef<(() => void) | void>(null);
  const effectCb = useDebounce(() => {
    cleanUp.current = callback();
  }, ms);

  useEffect(() => {
    effectCb();

    return () => {
      if (typeof cleanUp.current === 'undefined') {
        return;
      }
      cleanUp.current?.();
      cleanUp.current = undefined;
    };
  }, deps);
};
