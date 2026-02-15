import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { setTabIndex } from '../../../store';
import CustomTabs from '../custom-tabs/CustomTabs';

const mockDispatch = vi.fn();
const mockState: { profile: number } = { profile: 0 };

vi.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: () => mockState,
}));

describe('CustomTabs', () => {
  it('renders tabs and panels and dispatches on tab click', async () => {
    const tabs = [
      { label: 'Tab 1', component: <div>One</div> },
      { label: 'Tab 2', component: <div>Two</div> },
    ];

    render(<CustomTabs type={'profile'} tabs={tabs} level="primary" />);

    expect(screen.getAllByText('One')).toBeDefined();
    expect(screen.queryByText('Two')).toBeNull();

    // click the second tab
    const tabTwo = screen.getByText('Tab 2');
    fireEvent.click(tabTwo);

    expect(mockDispatch).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith(setTabIndex({ type: 'profile', newValue: 1 }));
  });
});
