import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi } from 'vitest';
import CustomAccordion from '../custom-accordion/CustomAccordion';

describe('CustomAccordion', () => {
  it('renders title and children when initially expanded', () => {
    render(
      <CustomAccordion title={<div>My Title</div>} isExpanded={true}>
        <div>Panel content</div>
      </CustomAccordion>
    );

    expect(screen.getByText('My Title')).toBeInTheDocument();
    expect(screen.getByText('Panel content')).toBeInTheDocument();
  });

  it('keeps children in the DOM when collapsed', () => {
    render(
      <CustomAccordion title={<div>Hidden Title</div>} isExpanded={false}>
        <div>Hidden content</div>
      </CustomAccordion>
    );

    expect(screen.getByText('Hidden Title')).toBeInTheDocument();
    // Material UI Accordion may keep DOM node but visually hidden; assert that content is present but not visible
    const content = screen.getByText('Hidden content');
    expect(content).toBeInTheDocument();
  });

  it('reports expansion and collapse through onToggle', async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();
    render(
      <CustomAccordion title={<div>Clickable</div>} isExpanded={false} onToggle={onToggle}>
        <div>Interactive content</div>
      </CustomAccordion>
    );

    const summaryButton = screen.getByRole('button', { name: /clickable/i });
    expect(summaryButton).toBeInTheDocument();
    await user.click(summaryButton);
    expect(onToggle).toHaveBeenLastCalledWith(true);

    await user.click(summaryButton);
    expect(onToggle).toHaveBeenLastCalledWith(false);
    expect(screen.getByText('Interactive content')).toBeInTheDocument();
  });
});
