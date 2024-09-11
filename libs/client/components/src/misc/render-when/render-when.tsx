/* eslint-disable react/jsx-no-useless-fragment */
import * as React from 'react';

export type WhenProps = {
  children: React.ReactNode;
  isTrue?: boolean;
  limit?: number;
};

export const RenderWhen = ({ children, limit = 1, isTrue = true }: WhenProps) => {
  const list: React.ReactNode[] = [];

  if (isTrue !== true) {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  React.Children.map(children, (child: any) => {
    const { isTrue: isChildTrue } = child?.props || {};

    if (isChildTrue === true && list.length < (limit ?? 100)) {
      list.push(child);
    }
  });

  return <>{list}</>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
RenderWhen.If = ({ children, isTrue }: { children: any; isTrue: boolean }) => children;

export default RenderWhen;
