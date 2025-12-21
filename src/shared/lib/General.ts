/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable */
export type AnyType = any;

export const isDev = __DEV__;

export const noop = () => {};

export const withDelay = (ms: number) => {
  return new Promise<void>(resolve => {
    setTimeout(resolve, ms);
  });
};

export const debounce = <T extends (...args: any[]) => any>(
  fn: T,
  ms: number,
) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  function debounced(...args: Parameters<T>) {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      timeoutId = null;
      fn(...args);
    }, ms);
  }

  debounced.cancel = () => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  return debounced;
};
