import { useLayoutEffect, useRef, useState } from 'react';

export interface UseContainerSize {
  ref: React.RefObject<HTMLDivElement>;
  width: number;
  height: number;
}

export function UseContainerSize(): UseContainerSize {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (ref.current) {
      const { offsetWidth, offsetHeight } = ref.current;
      setSize({ width: offsetWidth, height: offsetHeight });
    }
  }, []);

  return { ref, width: size.width, height: size.height };
}

export default UseContainerSize;
