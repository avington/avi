import styled from 'styled-components';

export const StyledDropdown = styled.select`
  border: 2px solid var(--material-color-light-blue-200);
  font-size: 1.2rem;
  border-radius: 0.5rem;
  padding: 0.5rem;
  margin: 0.5rem;
  background-color: white;
  color: black;
  appearance: none; /* Remove default dropdown arrow */
  background-image: url('data:image/svg+xml;utf8,<svg fill="black" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/></svg>');
  background-repeat: no-repeat;
  background-position: right 1rem center; /* Adjusted position */
  background-size: 1.2rem;
  text-align: left; /* Push text to the left */
  width: 15rem; /* Increased width */
`;

export const StyledOption = styled.option`
  font-size: 1.2rem;
  padding: 0.5rem;
`;
