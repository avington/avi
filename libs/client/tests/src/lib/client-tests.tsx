import { configureStore } from '@reduxjs/toolkit';
import { RenderResult, render as rtlRender } from '@testing-library/react';
import { FunctionComponent, JSXElementConstructor, PropsWithChildren, ReactElement } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';

const render = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ui: ReactElement<any, string | JSXElementConstructor<any>>,
  { store = configureStore({ reducer: { test: () => null } }), ...renderOptions } = {}
): RenderResult => {
  vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
    return {
      ...actual,
      useParams: vi.fn().mockReturnValue({ portfolioId: '999', stockId: '888', lotId: '777' }),
    };
  });

  vi.mock('formik', async () => {
    const formik = await vi.importActual<typeof import('formik')>('formik');
    return {
      ...formik,
      useField: () => [{}, {}, {}],
      useFormikContext: () => ({
        values: {},
        setFieldValue: vi.fn(),
        setFieldTouched: vi.fn(),
        validateForm: vi.fn(),
        validateField: vi.fn(),
        errors: {},
        touched: {},
      }),
    };
  });

  const Wrapper: FunctionComponent = (props: PropsWithChildren<unknown>) => {
    return (
      <Provider store={store}>
        <BrowserRouter>{props.children}</BrowserRouter>
      </Provider>
    );
  };

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

// re-export everything
export * from '@testing-library/react';

// override render method
export { render };
