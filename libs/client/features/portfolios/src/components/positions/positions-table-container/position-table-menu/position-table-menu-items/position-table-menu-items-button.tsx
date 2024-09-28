import styled from 'styled-components';

interface ButtonProps {
  $active?: boolean;
}

const PositionViewButton = styled.button<ButtonProps>`
  border: none;
  background-color: ${(props) => (props.$active ? 'var(--material-color-light-blue-100)' : 'transparent')};
  text-decoration: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s;
  color: var(--material-color-indigo-800);
  padding: 0.25rem 1rem;
  font-size: 1.35rem;
  font-weight: 500;

  &:hover {
    color: var(--material-color-indigo-900);
  }
`;

export default PositionViewButton;
