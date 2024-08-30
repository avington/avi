import { act, renderHook } from '@testing-library/react';

import useDebounce from './use-debounce';

describe('useDebounce', () => {
  it('should render successfully', () => {
    const t: { t: string } = { t: 'test' };
    const s: { t: string } = { t: 'test s' };

    const { result } = renderHook(() => useDebounce(t, 300));
    const [value, setValue] = result.current;

    expect(value).toEqual(t);

    act(() => {
      setValue(s);
      setValue(s);
      setValue(s);
    });

    // should still be t because of 300 ms delay
    expect(value).toEqual(t);

    setTimeout(() => {
      // should now be s because we wait 400 ms
      expect(value).toEqual(s);
    }, 400);
  });
});
