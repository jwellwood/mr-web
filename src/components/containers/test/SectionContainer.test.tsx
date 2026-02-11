import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import SectionContainer from '../section-container/SectionContainer';

describe('SectionContainer', () => {
  test('renders with title and children', () => {
    render(
      <SectionContainer title="Section Title">
        <div>Section content</div>
      </SectionContainer>
    );

    expect(screen.getByText('Section Title')).toBeInTheDocument();
    expect(screen.getByText('Section content')).toBeInTheDocument();
  });

  test('renders with title and subtitle', () => {
    render(
      <SectionContainer title="Main Title" subtitle="Subtitle text">
        <div>Content</div>
      </SectionContainer>
    );

    expect(screen.getByText('Main Title')).toBeInTheDocument();
    expect(screen.getByText('Subtitle text')).toBeInTheDocument();
  });

  test('renders without subtitle', () => {
    render(
      <SectionContainer title="Only Title">
        <div>Content</div>
      </SectionContainer>
    );

    expect(screen.getByText('Only Title')).toBeInTheDocument();
  });

  test('renders with default type (no special styling)', () => {
    const { container } = render(
      <SectionContainer title="Default Section">
        <div>Content</div>
      </SectionContainer>
    );

    expect(container.querySelector('[class*="MuiPaper"]')).toBeInTheDocument();
  });

  test('renders with winner type', () => {
    render(
      <SectionContainer title="Winner Section" type="winner">
        <div>Winner content</div>
      </SectionContainer>
    );

    expect(screen.getByText('Winner Section')).toBeInTheDocument();
    expect(screen.getByText('Winner content')).toBeInTheDocument();
  });

  test('renders with delete type', () => {
    render(
      <SectionContainer title="Delete Section" type="delete">
        <div>Delete content</div>
      </SectionContainer>
    );

    expect(screen.getByText('Delete Section')).toBeInTheDocument();
    expect(screen.getByText('Delete content')).toBeInTheDocument();
  });

  test('renders Paper component', () => {
    const { container } = render(
      <SectionContainer title="Paper Section">
        <div>Content</div>
      </SectionContainer>
    );

    expect(container.querySelector('[class*="MuiPaper"]')).toBeInTheDocument();
  });

  test('renders with transition wrapper', () => {
    render(
      <SectionContainer title="Fade Section">
        <div>Fading content</div>
      </SectionContainer>
    );

    expect(screen.getByText('Fading content')).toBeInTheDocument();
  });

  test('renders complex children', () => {
    render(
      <SectionContainer title="Complex Section">
        <div>
          <h3>Subsection</h3>
          <p>Paragraph 1</p>
          <p>Paragraph 2</p>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
          </ul>
        </div>
      </SectionContainer>
    );

    expect(screen.getByText('Complex Section')).toBeInTheDocument();
    expect(screen.getByText('Subsection')).toBeInTheDocument();
    expect(screen.getByText('Paragraph 1')).toBeInTheDocument();
    expect(screen.getByText('Paragraph 2')).toBeInTheDocument();
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  test('renders with multiple children elements', () => {
    render(
      <SectionContainer title="Multiple Children">
        <div>First child</div>
        <div>Second child</div>
        <div>Third child</div>
      </SectionContainer>
    );

    expect(screen.getByText('First child')).toBeInTheDocument();
    expect(screen.getByText('Second child')).toBeInTheDocument();
    expect(screen.getByText('Third child')).toBeInTheDocument();
  });

  test('handles long title', () => {
    render(
      <SectionContainer title="This is a very long section title that might need to wrap">
        <div>Content</div>
      </SectionContainer>
    );

    expect(screen.getByText(/This is a very long section title/)).toBeInTheDocument();
  });

  test('handles long subtitle', () => {
    render(
      <SectionContainer
        title="Title"
        subtitle="This is a very long subtitle that provides additional context and information"
      >
        <div>Content</div>
      </SectionContainer>
    );

    expect(screen.getByText(/This is a very long subtitle/)).toBeInTheDocument();
  });

  test('renders winner type with subtitle', () => {
    render(
      <SectionContainer title="Winner" subtitle="First Place" type="winner">
        <div>Winning content</div>
      </SectionContainer>
    );

    expect(screen.getByText('Winner')).toBeInTheDocument();
    expect(screen.getByText('First Place')).toBeInTheDocument();
  });

  test('renders delete type with subtitle', () => {
    render(
      <SectionContainer title="Delete" subtitle="Confirm deletion" type="delete">
        <div>Delete confirmation</div>
      </SectionContainer>
    );

    expect(screen.getByText('Delete')).toBeInTheDocument();
    expect(screen.getByText('Confirm deletion')).toBeInTheDocument();
  });

  test('renders empty children', () => {
    render(
      <SectionContainer title="Empty Section">
        <></>
      </SectionContainer>
    );

    expect(screen.getByText('Empty Section')).toBeInTheDocument();
  });
});
