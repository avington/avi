import { useBoolean, useOutsideAlerter, UseOutsideAlerterRequest } from '@avi/client-hooks';
import MenuIcon from '@mui/icons-material/Menu';
import React, { useRef } from 'react';
import { animated, useSpring } from 'react-spring';
import styles from './button-menu.module.scss';

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
  const { value: isOpen, toggle, setFalse } = useBoolean(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const animation = useSpring({
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? `scale(1)` : `scale(0.5)`,
    transformOrigin: 'center center',
  });

  const request: UseOutsideAlerterRequest = {
    refButton: buttonRef,
    refListContainer: menuRef,
    outsideClicked: setFalse,
  };

  useOutsideAlerter(request);

  return (
    <div className={styles['container']}>
      <button onClick={toggle} className={styles['button']} aria-label="Position Menu" ref={buttonRef}>
        <MenuIcon />
      </button>
      {isOpen && (
        <animated.div style={animation} className={styles['menu']}>
          <div ref={menuRef}>
            {items.map((item, index) => (
              <div key={index}>{item}</div>
            ))}
          </div>
        </animated.div>
      )}
    </div>
  );
}

export default ButtonMenu;
