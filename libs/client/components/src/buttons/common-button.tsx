import styled from 'styled-components';
import { darken } from 'polished';

interface ButtonProps {
  backgroundColor: 'blue' | 'green' | 'red' | 'orange';
  size: 'small' | 'medium' | 'large';
}

const backgroundColors = {
  blue: 'var(--material-color-blue-800)',
  green: 'var(--material-color-green-800)',
  red: 'var(--material-color-red-800)',
  orange: 'var(--material-color-deep-orange-800)',
};

const sizes = {
  small: '8px 16px',
  medium: '12px 24px',
  large: '16px 32px',
};

const CommonButton = styled.button<ButtonProps>`
  background-color: ${({ backgroundColor }) => backgroundColors[backgroundColor]};
  padding: ${({ size }) => sizes[size]};
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  font-size: ${({ size }) => (size === 'small' ? '12px' : size === 'medium' ? '14px' : '16px')};

  &:hover {
    background-color: ${({ backgroundColor }) => darken(0.05, backgroundColors[backgroundColor])};
  }
`;

export default CommonButton;
