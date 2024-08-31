import { render, screen } from '@testing-library/react';

import RenderWhen from './render-when';

describe('RenderWhen', () => {
  it('should render successfully', async () => {
    const x = 2;

    const { baseElement } = render(
      <RenderWhen>
        <RenderWhen.If isTrue={x === 2}>
          <div data-testid="rendered"></div>
        </RenderWhen.If>
        <RenderWhen.If isTrue={x !== 2}>
          <div data-testid="not-rendered"></div>
        </RenderWhen.If>
      </RenderWhen>
    );
    expect(baseElement).toBeTruthy();

    const renderedDiv = screen.queryAllByTestId('rendered');
    expect(renderedDiv).toBeTruthy();

    const notRendered = screen.queryAllByTestId('not-rendered');
    expect(notRendered.length).toBeFalsy();
  });
});
