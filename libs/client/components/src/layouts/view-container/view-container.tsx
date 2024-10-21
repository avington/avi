import styled from 'styled-components';

export const ViewContainer = styled.div`
  width: 1350px;
  height: calc(100vh - var(--total-header-height)); /* Set the height to the viewport height */
  margin: 0 auto;
  display: flex;
  justify-content: center;
  padding: 2rem 0 2rem 0;
  overflow-y: auto; /* Enable vertical scrolling when content overflows */

  /* Make the scrollbar skinny */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

export default ViewContainer;
