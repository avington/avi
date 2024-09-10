import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { homeRoutes } from './home.routes';
import '@testing-library/jest-dom';

describe('PortfoliosSummary', () => {
  it('should render successfully', () => {
    expect(homeRoutes().length).toBeGreaterThan(0);
  });
});
