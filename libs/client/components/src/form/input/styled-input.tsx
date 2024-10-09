import styled from 'styled-components';

export const StyledInput = styled.input`
  border: 1px solid var(--material-color-grey-400);
  font-size: 1.2rem;
  border-radius: 4px;
  padding: 0.75rem 0.5rem;
  margin: 0.5rem;
  appearance: auto; /* Ensure native appearance for date input */
  color: var(--material-color-grey-700);
`;

export default StyledInput;
