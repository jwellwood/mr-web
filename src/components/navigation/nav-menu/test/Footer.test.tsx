import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { VERSION } from '../../../../constants';
import TestWrapper from '../../../../utils/test-helpers/TestWrapper';
import Footer from '../Footer';

describe('Footer', () => {
  it('renders current year and version', () => {
    render(
      <TestWrapper>
        <Footer />
      </TestWrapper>
    );

    const year = new Date().getFullYear().toString();
    // Text may include surrounding symbols; match by substring
    expect(screen.getByText(content => content.includes(year))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`v\\s*${VERSION}`))).toBeInTheDocument();
  });
});
