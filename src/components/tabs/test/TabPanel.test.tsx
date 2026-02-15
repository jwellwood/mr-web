import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TabPanel from '../custom-tabs/TabPanel';

describe('TabPanel', () => {
  it('renders children when value matches index', () => {
    render(
      <TabPanel value={0} index={0}>
        <div>Content</div>
      </TabPanel>
    );

    expect(screen.getByText('Content')).toBeDefined();
  });

  it('does not render when value does not match index', () => {
    const { queryByText } = render(
      <TabPanel value={1} index={0}>
        <div>Hidden</div>
      </TabPanel>
    );

    expect(queryByText('Hidden')).toBeNull();
  });
});
