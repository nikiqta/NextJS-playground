'use client';

import { useEffect, useMemo, useRef } from 'react';

export const useDebounce = <T extends (...args: any[]) => void>(
  func: T,
  wait: number
) => {
  const funcRef = useRef(func);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    funcRef.current = func;
  }, [func]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return useMemo(() => {
    return (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        funcRef.current(...args);
      }, wait);
    };
  }, [wait]);
};