import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import TestWrapper from '../../../utils/test-helpers/TestWrapper';
import HelpModal from '../help-modal/HelpModal';

describe('HelpModal', () => {
  it('renders the help icon button', () => {
    render(
      <TestWrapper>
        <HelpModal title="Team">
          <div>Sample Content</div>
        </HelpModal>
      </TestWrapper>
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('opens dialog with title when help button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <HelpModal title="Team">
          <div>Sample Content</div>
        </HelpModal>
      </TestWrapper>
    );

    await user.click(screen.getByRole('button'));
    expect(screen.getByText('Team Help')).toBeInTheDocument();
  });

  it('renders children content in the dialog', async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <HelpModal title="Team">
          <div>Sample Content</div>
        </HelpModal>
      </TestWrapper>
    );

    await user.click(screen.getByRole('button'));
    expect(screen.getByText('Sample Content')).toBeInTheDocument();
  });

  it('closes the dialog when Close is clicked', async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <HelpModal title="Team">
          <div>Sample Content</div>
        </HelpModal>
      </TestWrapper>
    );

    await user.click(screen.getByRole('button'));
    expect(screen.getByText('Team Help')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /close/i }));
    expect(screen.queryByText('Team Help')).not.toBeVisible();
  });
});
