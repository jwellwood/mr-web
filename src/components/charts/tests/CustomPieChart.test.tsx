import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CustomPieChart from '../custom-pie-chart/CustomPieChart';

describe('CustomPieChart', () => {
  it('renders without crashing with minimal data', () => {
    const data = [{ name: 'A', value: 10 }];
    const { container } = render(<CustomPieChart data={data} />);
    expect(container.firstChild).toBeTruthy();
  });
});
