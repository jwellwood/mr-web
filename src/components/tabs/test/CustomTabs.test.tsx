import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import CustomTabs from '../custom-tabs/CustomTabs';

describe('CustomTabs', () => {
  it('renders tabs and panels and switches on tab click', async () => {
    const tabs = [
      { label: 'Tab 1', component: <div>One</div> },
      { label: 'Tab 2', component: <div>Two</div> },
    ];

    render(
      <MemoryRouter>
        <CustomTabs type={'profile'} tabs={tabs} level="primary" />
      </MemoryRouter>
    );

    expect(screen.getAllByText('One')).toBeDefined();
    expect(screen.queryByText('Two')).toBeNull();

    // click the second tab
    const tabTwo = screen.getByText('Tab 2');
    fireEvent.click(tabTwo);

    expect(screen.queryByText('Two')).toBeDefined();
  });
});
