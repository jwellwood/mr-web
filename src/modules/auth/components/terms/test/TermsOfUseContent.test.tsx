import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import { terms } from '..';
import TestWrapper from '../../../../../utils/test-helpers/TestWrapper';
import TermsOfUseContent from '../TermsOfUseContent';

describe('TermsOfUseContent', () => {
  it('renders a section for every entry in terms', () => {
    render(
      <TestWrapper>
        <TermsOfUseContent />
      </TestWrapper>
    );

    terms.forEach((section, index) => {
      expect(screen.getByText(`${index + 1}. ${section.title}`)).toBeInTheDocument();
    });
  });

  it('renders numbered sub-labels for every content item', () => {
    render(
      <TestWrapper>
        <TermsOfUseContent />
      </TestWrapper>
    );

    terms.forEach((section, sectionIndex) => {
      section.content.forEach((_item, itemIndex) => {
        expect(screen.getByText(`${sectionIndex + 1}.${itemIndex + 1}`)).toBeInTheDocument();
      });
    });
  });

  it('renders the text of every content item', () => {
    render(
      <TestWrapper>
        <TermsOfUseContent />
      </TestWrapper>
    );

    terms.forEach(section => {
      section.content.forEach(item => {
        expect(screen.getByText(item)).toBeInTheDocument();
      });
    });
  });
});
