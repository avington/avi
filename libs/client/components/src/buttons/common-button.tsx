import styled from 'styled-components';
import { darken } from 'polished';

interface ButtonProps {
  backgroundColor: 'blue' | 'green' | 'red' | 'orange' | 'grey';
  size: 'small' | 'medium' | 'large';
}

const backgroundColors = {
  blue: 'var(--material-color-blue-800)',
  green: 'var(--material-color-green-800)',
  red: 'var(--material-color-red-800)',
  orange: 'var(--material-color-deep-orange-800)',
  grey: 'var(--material-color-grey-100)',
};

const hoverBackgroundColors = {
  blue: 'var(--material-color-blue-900)',
  green: 'var(--material-color-green-900)',
  red: 'var(--material-color-red-900)',
  orange: 'var(--material-color-deep-orange-900)',
  grey: 'var(--material-color-grey-200)',
};

const sizes = {
  small: '8px 16px',
  medium: '12px 24px',
  large: '16px 32px',
};

export const CommonButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !['backgroundColor', 'size'].includes(prop),
})<Partial<ButtonProps>>`
  background-color: ${({ backgroundColor }) => backgroundColors[backgroundColor ?? 'blue']};
  padding: ${({ size }) => sizes[size ?? 'medium']};
  border: none;
  border-radius: 4px;
  color: ${({ backgroundColor }) => (backgroundColor === 'grey' ? 'var(--material-color-grey-800)' : 'white')};
  cursor: pointer;
  font-size: ${({ size }) => (size === 'small' ? '12px' : size === 'medium' ? '14px' : '16px')};

  &:hover {
    background-color: ${({ backgroundColor }) => hoverBackgroundColors[backgroundColor ?? 'blue']};
  }
`;

export default CommonButton;
