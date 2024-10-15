import styled from 'styled-components';

import { HTMLAttributes } from 'react';

export interface SummaryDetailProps extends HTMLAttributes<HTMLHeadingElement> {
  $profitEvenLoss?: 'profit' | 'even' | 'loss';
}

export const SummaryDetail = styled.h5<SummaryDetailProps>`
  font-weight: 300;
  font-size: 1.2rem;
  color: ${(props: SummaryDetailProps) => {
    switch (props.$profitEvenLoss) {
      case 'profit':
        return 'var(--material-color-green-800)';
      case 'even':
        return 'var(--material-color-blue-grey-800)';
      case 'loss':
        return 'var(--material-color-red-800)';
      default:
        return 'var(--material-color-blue-grey-800)';
    }
  }};
`;
