import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TestWrapper from '../../../../utils/test-helpers/TestWrapper';
import OrgSetupChecklist from '../CustomCheckList';

const steps = [
  { done: true, label: 'Add logo', secondary: 'Upload your team logo' },
  { done: false, label: 'Add players', secondary: 'Register at least one player' },
];

describe('OrgSetupChecklist', () => {
  it('renders step labels and secondary text', () => {
    render(
      <TestWrapper>
        <OrgSetupChecklist title="Setup" steps={steps} allDone={false} loading={false} />
      </TestWrapper>
    );

    expect(screen.getByText('Add logo')).toBeInTheDocument();
    expect(screen.getByText('Upload your team logo')).toBeInTheDocument();
    expect(screen.getByText('Add players')).toBeInTheDocument();
    expect(screen.getByText('Register at least one player')).toBeInTheDocument();
  });

  it('renders the title when not loading', () => {
    render(
      <TestWrapper>
        <OrgSetupChecklist title="Setup" steps={steps} allDone={false} loading={false} />
      </TestWrapper>
    );

    expect(screen.getByText('Setup')).toBeInTheDocument();
  });

  it('shows a spinner and hides the title when loading', () => {
    render(
      <TestWrapper>
        <OrgSetupChecklist title="Setup" steps={steps} allDone={false} loading={true} />
      </TestWrapper>
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.queryByText('Setup')).not.toBeInTheDocument();
  });

  it('accordion is expanded when not all steps are done', () => {
    render(
      <TestWrapper>
        <OrgSetupChecklist title="Setup" steps={steps} allDone={false} loading={false} />
      </TestWrapper>
    );

    const button = screen.getByRole('button', { name: /setup/i });
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });

  it('accordion is collapsed when all steps are done', () => {
    render(
      <TestWrapper>
        <OrgSetupChecklist title="Setup" steps={steps} allDone={true} loading={false} />
      </TestWrapper>
    );

    const button = screen.getByRole('button', { name: /setup/i });
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });
});
