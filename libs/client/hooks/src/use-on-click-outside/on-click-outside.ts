import { RefObject } from 'react';
import useEventListener from '../use-event-listener/use-event-listener';

type Handler = (event: MouseEvent) => void;

/**
 * @description React hook for listening for clicks outside of a specified element
 * @example useOnClickOutside(ref, handleClickOutside)
 * @param ref
 * @param handler
 * @param mouseEvent
 */
export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: Handler,
  mouseEvent: 'mousedown' | 'mouseup' = 'mousedown'
): void {
  useEventListener(mouseEvent, (event: MouseEvent) => {
    const el = ref?.current;

    // Do nothing if clicking ref's element or descendent elements
    if (!el || el.contains(event.target as Node)) {
      return;
    }

    handler(event);
  });
}

export default useOnClickOutside;
