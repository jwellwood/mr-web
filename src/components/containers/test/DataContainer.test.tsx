import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { type IListItem } from '../../lists';
import DataContainer from '../data-container/DataContainer';

describe('DataContainer', () => {
  const mockData: IListItem[] = [
    { label: 'Name', value: 'John Doe' },
    { label: 'Age', value: '30' },
    { label: 'Location', value: 'New York', icon: <span>Mock icon</span> },
  ];

  test('renders all data items', () => {
    render(<DataContainer data={mockData} />);

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('Location')).toBeInTheDocument();
    expect(screen.getByText('New York')).toBeInTheDocument();
  });

  test('renders with icons when provided', () => {
    const { container } = render(<DataContainer data={mockData} />);

    // Icons are rendered in grid items
    const gridItems = container.querySelectorAll('[class*="MuiGrid"]');
    expect(gridItems.length).toBeGreaterThan(0);
  });

  test('renders without icons when not provided', () => {
    const dataWithoutIcons: IListItem[] = [
      { label: 'Title', value: 'Test Title' },
      { label: 'Description', value: 'Test Description' },
    ];

    render(<DataContainer data={dataWithoutIcons} />);

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.queryByText('person')).not.toBeInTheDocument();
  });

  test('renders loading skeletons when loading is true', () => {
    const { container } = render(<DataContainer data={mockData} loading />);

    const skeletons = container.querySelectorAll('[class*="MuiSkeleton"]');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  test('does not render actual data when loading', () => {
    render(<DataContainer data={mockData} loading />);

    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    expect(screen.queryByText('30')).not.toBeInTheDocument();
  });

  test('renders Paper components for data items', () => {
    const { container } = render(<DataContainer data={mockData} />);

    const papers = container.querySelectorAll('[class*="MuiPaper"]');
    expect(papers.length).toBeGreaterThan(0);
  });

  test('renders empty array without errors', () => {
    const { container } = render(<DataContainer data={[]} />);

    expect(container.querySelector('[class*="MuiGrid"]')).toBeInTheDocument();
  });

  test('handles single data item', () => {
    const singleItem: IListItem[] = [
      { label: 'Email', value: 'test@example.com', icon: <>icon</> },
    ];

    render(<DataContainer data={singleItem} />);

    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByText('icon')).toBeInTheDocument();
  });

  test('handles long values', () => {
    const longValueData: IListItem[] = [
      {
        label: 'Description',
        value:
          'This is a very long description that might need to wrap to multiple lines in the UI',
      },
    ];

    render(<DataContainer data={longValueData} />);

    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText(/This is a very long description/)).toBeInTheDocument();
  });

  test('renders grid structure', () => {
    const { container } = render(<DataContainer data={mockData} />);

    const grids = container.querySelectorAll('[class*="MuiGrid"]');
    expect(grids.length).toBeGreaterThan(0);
  });

  test('handles special characters in values', () => {
    const specialCharData: IListItem[] = [
      { label: 'Name', value: "O'Brien & Co." },
      { label: 'Code', value: '<script>alert("test")</script>' },
    ];

    render(<DataContainer data={specialCharData} />);

    expect(screen.getByText("O'Brien & Co.")).toBeInTheDocument();
    expect(screen.getByText('<script>alert("test")</script>')).toBeInTheDocument();
  });

  test('renders numeric values as strings', () => {
    const numericData: IListItem[] = [
      { label: 'Count', value: '0' },
      { label: 'Total', value: '1000000' },
    ];

    render(<DataContainer data={numericData} />);

    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText('1000000')).toBeInTheDocument();
  });
});
