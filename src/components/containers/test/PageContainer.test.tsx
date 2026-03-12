import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PageContainer from '../page-container/PageContainer';

// PageHeader has router/auth dependencies — mock the barrel to test PageContainer in isolation
vi.mock('../../composed', () => ({
  PageHeader: ({
    title,
    children,
    backButton,
    help,
  }: {
    title: string;
    children: React.ReactElement;
    backButton?: boolean;
    help?: unknown;
  }) => (
    <div
      data-testid="page-header"
      data-back-button={String(backButton)}
      data-has-help={String(!!help)}
    >
      <span data-testid="page-title">{title}</span>
      <div data-testid="page-children">{children}</div>
    </div>
  ),
}));

describe('PageContainer', () => {
  it('forwards title to PageHeader', () => {
    render(
      <PageContainer title="My Page">
        <div>Content</div>
      </PageContainer>
    );
    expect(screen.getByTestId('page-title')).toHaveTextContent('My Page');
  });

  it('forwards children to PageHeader', () => {
    render(
      <PageContainer title="Test">
        <div>Page Content</div>
      </PageContainer>
    );
    expect(screen.getByText('Page Content')).toBeInTheDocument();
  });

  it('defaults backButton to true', () => {
    render(
      <PageContainer title="Test">
        <div />
      </PageContainer>
    );
    expect(screen.getByTestId('page-header')).toHaveAttribute('data-back-button', 'true');
  });

  it('forwards backButton={false} to PageHeader', () => {
    render(
      <PageContainer title="Home" backButton={false}>
        <div />
      </PageContainer>
    );
    expect(screen.getByTestId('page-header')).toHaveAttribute('data-back-button', 'false');
  });

  it('forwards help prop to PageHeader when provided', () => {
    const help = { title: 'Help', content: [] };
    render(
      <PageContainer title="Test" help={help}>
        <div />
      </PageContainer>
    );
    expect(screen.getByTestId('page-header')).toHaveAttribute('data-has-help', 'true');
  });
});
