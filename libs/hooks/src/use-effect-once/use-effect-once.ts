import { EffectCallback, useEffect } from 'react';

/**
 *
 * @param effect
 * @description Just modified version of useEffect that's executed only one time, at the mounting time.
 */
export function useEffectOnce(effect: EffectCallback) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, []);
}

export default useEffectOnce;
