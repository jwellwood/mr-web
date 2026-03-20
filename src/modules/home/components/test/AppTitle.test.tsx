import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TestWrapper from '../../../../utils/test-helpers/TestWrapper';
import AppTitle from '../AppTitle';

describe('AppTitle', () => {
  it('renders the app name', () => {
    render(
      <TestWrapper>
        <AppTitle />
      </TestWrapper>
    );
    expect(screen.getByText('Footy')).toBeInTheDocument();
  });

  it('renders the app subtitle', () => {
    render(
      <TestWrapper>
        <AppTitle />
      </TestWrapper>
    );
    expect(screen.getByText('Stats')).toBeInTheDocument();
  });

  it('renders the tagline', () => {
    render(
      <TestWrapper>
        <AppTitle />
      </TestWrapper>
    );
    expect(screen.getByText('Track your results and stats')).toBeInTheDocument();
  });
});
