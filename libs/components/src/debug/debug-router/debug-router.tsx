import { PropsWithChildren } from 'react';
import { useLocation } from 'react-router-dom';
import './debug-router.module.scss';

/* eslint-disable-next-line */
export interface DebugRouterProps {
  isDevelopment: boolean;
}

export const DebugRouter = ({ children }: PropsWithChildren<DebugRouterProps>) => {
  const { pathname, search, state } = useLocation();
  if (children) {
    console.log(`Route: ${pathname}${search}, State: ${JSON.stringify(state)}`);
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};
