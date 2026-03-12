import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import TestWrapper from '../../../utils/test-helpers/TestWrapper';
import PresentationModal from '../presentation-modal/PresentationModal';

describe('PresentationModal', () => {
  it('renders the buttonElement trigger', () => {
    render(
      <TestWrapper>
        <PresentationModal buttonElement={<span>View Details</span>}>
          <div>Modal content</div>
        </PresentationModal>
      </TestWrapper>
    );
    expect(screen.getByText('View Details')).toBeInTheDocument();
  });

  it('opens dialog with children when trigger is clicked', async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <PresentationModal buttonElement={<span>Open</span>}>
          <div>Presentation content</div>
        </PresentationModal>
      </TestWrapper>
    );

    await user.click(screen.getByRole('button'));
    expect(screen.getByText('Presentation content')).toBeInTheDocument();
  });

  it('renders title in dialog when provided', async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <PresentationModal buttonElement={<span>Open</span>} title="Match Details">
          <div>Content</div>
        </PresentationModal>
      </TestWrapper>
    );

    await user.click(screen.getByRole('button'));
    expect(screen.getByText('Match Details')).toBeInTheDocument();
  });

  it('does not render dialog title when no title prop given', async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <PresentationModal buttonElement={<span>Open</span>}>
          <div>Content</div>
        </PresentationModal>
      </TestWrapper>
    );

    await user.click(screen.getByRole('button'));
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  it('closes dialog when Back is clicked', async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <PresentationModal buttonElement={<span>Open</span>} title="Details">
          <div>Content</div>
        </PresentationModal>
      </TestWrapper>
    );

    await user.click(screen.getByRole('button'));
    expect(screen.getByText('Details')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /back/i }));
    expect(screen.queryByText('Details')).not.toBeVisible();
  });
});
