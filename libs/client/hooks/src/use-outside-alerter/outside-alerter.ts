import { MutableRefObject, useEffect } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UseOutsideAlerterRequest {
  /**
   * @description callback event to fire when outside clicked.
   */
  outsideClicked: () => void;
  /**
   * @description Container to compare if outside of.
   */
  refListContainer: MutableRefObject<HTMLDivElement | null>;
  /**
   * @description Optional reference to button to exclude
   */
  refButton?: MutableRefObject<HTMLButtonElement | null>;
}

export function useOutsideAlerter({ refButton, refListContainer, outsideClicked }: UseOutsideAlerterRequest): void {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        refButton?.current &&
        !refButton.current.contains(event.target as Node) &&
        refListContainer.current &&
        !refListContainer.current.contains(event.target as Node)
      ) {
        outsideClicked();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [refButton, refListContainer, outsideClicked]);
}

export default useOutsideAlerter;
