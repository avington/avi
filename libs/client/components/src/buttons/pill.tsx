import styled from 'styled-components';

export const Pill = styled.button`
  background-color: var(--material-color-blue-grey-50);
  border: 1px solid var(--material-color-blue-grey-100);
  border-radius: 20px;
  padding: 8px 16px;
  color: var(--material-color-blue-grey-700);
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: var(--material-color-blue-grey-100);
  }
`;

export default Pill;
