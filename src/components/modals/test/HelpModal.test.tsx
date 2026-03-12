import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import TestWrapper from '../../../utils/test-helpers/TestWrapper';
import HelpModal, { type HelpContent } from '../help-modal/HelpModal';

const sampleHelp: HelpContent = {
  title: 'Team',
  content: [
    {
      title: 'Overview',
      description: ['General team information and stats.'],
    },
    {
      title: 'Matches',
      description: ['View fixtures and results.'],
    },
  ],
};

describe('HelpModal', () => {
  it('renders the help icon button', () => {
    render(
      <TestWrapper>
        <HelpModal help={sampleHelp} />
      </TestWrapper>
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('opens dialog with title when help button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <HelpModal help={sampleHelp} />
      </TestWrapper>
    );

    await user.click(screen.getByRole('button'));
    expect(screen.getByText('Team Help')).toBeInTheDocument();
  });

  it('renders all section titles in the dialog', async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <HelpModal help={sampleHelp} />
      </TestWrapper>
    );

    await user.click(screen.getByRole('button'));
    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText('Matches')).toBeInTheDocument();
  });

  it('renders section description items', async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <HelpModal help={sampleHelp} />
      </TestWrapper>
    );

    await user.click(screen.getByRole('button'));
    expect(screen.getByText('General team information and stats.')).toBeInTheDocument();
    expect(screen.getByText('View fixtures and results.')).toBeInTheDocument();
  });

  it('closes the dialog when Close is clicked', async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <HelpModal help={sampleHelp} />
      </TestWrapper>
    );

    await user.click(screen.getByRole('button'));
    expect(screen.getByText('Team Help')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /close/i }));
    expect(screen.queryByText('Team Help')).not.toBeVisible();
  });

  it('renders sections without description gracefully', async () => {
    const user = userEvent.setup();
    const helpNoDesc: HelpContent = {
      title: 'Minimal',
      content: [{ title: 'Section A' }],
    };
    render(
      <TestWrapper>
        <HelpModal help={helpNoDesc} />
      </TestWrapper>
    );

    await user.click(screen.getByRole('button'));
    expect(screen.getByText('Section A')).toBeInTheDocument();
  });
});
