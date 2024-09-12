import { useEffect, useRef } from 'react';

export function useCloseButton() {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  return { closeButtonRef };
}
