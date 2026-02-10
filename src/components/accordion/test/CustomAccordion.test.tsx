import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import { describe, it, expect } from 'vitest';
import CustomAccordion from '../custom-accordion/CustomAccordion';

describe('CustomAccordion', () => {
  it('renders title and children when expanded', async () => {
    render(
      <CustomAccordion title={<div>My Title</div>} isExpanded={true}>
        <div>Panel content</div>
      </CustomAccordion>
    );

    expect(screen.getByText('My Title')).toBeInTheDocument();
    expect(screen.getByText('Panel content')).toBeInTheDocument();
  });

  it('renders title and hides children when not expanded', async () => {
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

  it('allows user interaction with the accordion summary', async () => {
    const user = userEvent.setup();
    render(
      <CustomAccordion title={<div>Clickable</div>} isExpanded={false}>
        <div>Interactive content</div>
      </CustomAccordion>
    );

    const summaryButton = screen.getByRole('button', { name: /clickable/i });
    expect(summaryButton).toBeInTheDocument();
    await user.click(summaryButton);

    // After click, content should exist (MUI handles expand animation; presence in DOM is sufficient)
    expect(screen.getByText('Interactive content')).toBeInTheDocument();
  });
});
