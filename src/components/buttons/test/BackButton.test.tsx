import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { describe, it, expect, beforeEach } from 'vitest';
import BackButton from '../back-button/BackButton';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('BackButton', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders the button', () => {
    render(
      <BrowserRouter>
        <BackButton />
      </BrowserRouter>
    );

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('navigates back when clicked', () => {
    render(
      <BrowserRouter>
        <BackButton />
      </BrowserRouter>
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
