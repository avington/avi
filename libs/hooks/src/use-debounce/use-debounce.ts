import { useDebugValue, useEffect, useState } from 'react';
import { BehaviorSubject, debounceTime } from 'rxjs';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UseDebounce {
  count: number;
  increment: () => void;
}

export function useDebounce<T>(obj: T | null, time: number) {
  const [value, setValue] = useState<T | null>(obj);
  const [values$] = useState(() => new BehaviorSubject<T | null>(null));

  useEffect(() => {
    const sub = values$.pipe(debounceTime(time ?? 300)).subscribe(setValue);
    return () => sub.unsubscribe();
  }, [time, values$]);

  useDebugValue('debounce hook');

  return [value, (v: T) => values$.next(v)] as const;
}

export default useDebounce;
