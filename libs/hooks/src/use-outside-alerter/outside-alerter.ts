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
  refListContainer: MutableRefObject<null>;
  /**
   * @description Optional reference to button to exclude
   */
  refButton?: MutableRefObject<null>;
}

export function useOutsideAlerter(request: UseOutsideAlerterRequest): void {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: MouseEvent) {
      // get the current list container reference
      const currentListContainer = request.refListContainer
        .current as unknown as {
        contains: (tgt: EventTarget | null) => boolean;
      };

      // get the current button container reference if it exists
      const currentButtonContainer = request?.refButton?.current as unknown as
        | { contains: (tgt: EventTarget | null) => boolean }
        | undefined;

      const isInsideListContainer =
        currentListContainer && currentListContainer.contains(event.target);
      const isInsideButtonContainer =
        currentButtonContainer && currentButtonContainer.contains(event.target);

      setTimeout(() => {
        if (!isInsideListContainer && !isInsideButtonContainer) {
          request.outsideClicked();
        }
      }, 100);
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [request]);
}

export default useOutsideAlerter;
