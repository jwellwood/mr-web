import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import TestWrapper from '../../../../utils/test-helpers/TestWrapper';
import CustomTableCell from '../CustomTableCell';

describe('CustomTableCell', () => {
  it('renders plain text value', () => {
    render(
      <TestWrapper>
        <CustomTableCell cellKey="goals" cellValue="10" />
      </TestWrapper>
    );
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('renders numeric value as string', () => {
    render(
      <TestWrapper>
        <CustomTableCell cellKey="goals" cellValue={7} />
      </TestWrapper>
    );
    expect(screen.getByText('7')).toBeInTheDocument();
  });

  it('renders position cell for cellType="position"', () => {
    render(
      <TestWrapper>
        <CustomTableCell cellKey="position" cellValue="GK" cellType="position" />
      </TestWrapper>
    );
    expect(screen.getByText('GK')).toBeInTheDocument();
  });

  it('renders position cell when cellKey is "position"', () => {
    render(
      <TestWrapper>
        <CustomTableCell cellKey="position" cellValue="MF" />
      </TestWrapper>
    );
    expect(screen.getByText('MF')).toBeInTheDocument();
  });

  it('renders DifferenceText for cellType="difference"', () => {
    const { container } = render(
      <TestWrapper>
        <CustomTableCell cellKey="diff" cellValue={3} cellType="difference" />
      </TestWrapper>
    );
    expect(container).toHaveTextContent('+3');
  });

  it('renders NumberText with percentage for cellType="percentage"', () => {
    const { container } = render(
      <TestWrapper>
        <CustomTableCell cellKey="rate" cellValue={85} cellType="percentage" />
      </TestWrapper>
    );
    expect(container).toHaveTextContent('85');
    expect(container).toHaveTextContent('%');
  });

  it('renders a skeleton when loading is true and isStatic is false', () => {
    const { container } = render(
      <TestWrapper>
        <CustomTableCell cellKey="goals" cellValue="10" loading isStatic={false} />
      </TestWrapper>
    );
    expect(container.querySelector('[class*="MuiSkeleton"]')).toBeInTheDocument();
  });

  it('does not show a skeleton when isStatic is true', () => {
    const { container } = render(
      <TestWrapper>
        <CustomTableCell cellKey="goals" cellValue="10" loading isStatic />
      </TestWrapper>
    );
    expect(container).toHaveTextContent('10');
    expect(container.querySelector('[class*="MuiSkeleton"]')).not.toBeInTheDocument();
  });

  it('renders link cell with text', () => {
    render(
      <MemoryRouter>
        <TestWrapper>
          <CustomTableCell
            cellKey="name"
            cellValue={{ value: 'John Smith', link: '/players/1' }}
            cellType="link"
          />
        </TestWrapper>
      </MemoryRouter>
    );
    expect(screen.getByText('John Smith')).toBeInTheDocument();
  });
});
