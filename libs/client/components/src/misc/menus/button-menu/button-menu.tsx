import React, { useState, useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import { useOnClickOutside } from '@avi/client-hooks';
import styles from './button-menu.module.scss';
import MenuIcon from '@mui/icons-material/Menu';

import styled from 'styled-components';

export const ButtonMenuItem = styled.div`
  padding: 10px 20px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

export interface ButtonMenuProps {
  items: React.ReactNode[];
}

export function ButtonMenu({ items }: ButtonMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const animation = useSpring({
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? `scale(1)` : `scale(0.5)`,
    transformOrigin: 'center center',
  });

  useOnClickOutside(menuRef, () => setIsOpen(false));

  return (
    <div className={styles['container']}>
      <button onClick={() => setIsOpen(!isOpen)} className={styles['button']} aria-label="Position Menu">
        <MenuIcon />
      </button>
      {isOpen && (
        <animated.div style={animation} className={styles['menu']} ref={menuRef}>
          {items.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </animated.div>
      )}
    </div>
  );
}

export default ButtonMenu;
