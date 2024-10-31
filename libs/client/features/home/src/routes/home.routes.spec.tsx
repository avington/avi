import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import { homeRoutes } from './home.routes';

describe('PortfoliosSummary', () => {
  it('should render successfully', () => {
    expect(homeRoutes().length).toBeGreaterThan(0);
  });
});
