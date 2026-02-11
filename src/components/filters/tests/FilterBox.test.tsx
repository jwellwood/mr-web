import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import FilterBox from '../filter-box/FilterBox';

const sampleData = [
  { label: 'One', applied: true },
  { label: 'Two', applied: false },
];

describe('FilterBox', () => {
  it('renders AppIcon and filter chips', () => {
    const { container } = render(<FilterBox filterData={sampleData} applied={false} />);
    // chips should render with the provided labels
    expect(screen.getByText('One')).toBeTruthy();
    expect(screen.getByText('Two')).toBeTruthy();
    expect(container.firstChild).toBeTruthy();
  });
});
