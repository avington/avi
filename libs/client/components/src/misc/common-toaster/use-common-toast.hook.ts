import { useSpring } from 'react-spring';
import { ToastThemeTypes } from './common-toast-theme-types';

export interface UseCommonToastProps {
  onClose: () => void;
  isVisible: boolean;
  theme: ToastThemeTypes;
  wrapperRef?: React.RefObject<HTMLDivElement>;
}

export function useCommonToast({ onClose, isVisible }: UseCommonToastProps) {
  const animation = useSpring({
    opacity: isVisible ? 1 : 0,
  });

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Tab') {
      event.preventDefault();
    } else if (event.key === 'Escape') {
      onClose();
    }
  };

  return { animation, handleKeyDown };
}
