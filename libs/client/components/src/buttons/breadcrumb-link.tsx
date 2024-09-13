import React, { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  color: var(--material-color-blue-grey-800);
  text-decoration: underline;
  font-weight: bold;

  &:hover {
    color: var(--material-color-blue-grey-900);
    font-weight: bold;
  }
`;

export interface BreadcrumbLinkProps {
  to: string;
}

export const BreadcrumbLink = ({ to, children }: PropsWithChildren<BreadcrumbLinkProps>) => {
  return <StyledLink to={to}>{children}</StyledLink>;
};

export default BreadcrumbLink;
