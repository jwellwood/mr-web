import { render, screen, fireEvent } from '@testing-library/react';
import LogoutButton from './LogoutButton';

describe('LogoutButton', () => {
  it('renders with correct text and handles click', () => {
    const handleClick = jest.fn();
    render(<LogoutButton onClick={handleClick} />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
