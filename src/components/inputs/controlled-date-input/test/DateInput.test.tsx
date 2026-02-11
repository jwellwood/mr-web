import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import TestWrapper from '../../../../utils/test-helpers/TestWrapper';
import DateInput from '../DateInput';

describe('DateInput', () => {
  it('renders date picker', () => {
    const onChange = vi.fn();

    render(
      <TestWrapper>
        <DateInput
          inputName="dob"
          label="Date of Birth"
          defaultValue={null}
          onChange={onChange}
          disableFuture={true}
        />
      </TestWrapper>
    );

    expect(screen.getByRole('button', { name: /choose date/i })).toBeInTheDocument();
  });

  it('renders with default date value', () => {
    const onChange = vi.fn();
    const defaultDate = new Date('2000-01-01');

    render(
      <TestWrapper>
        <DateInput
          inputName="dob"
          label="Date of Birth"
          defaultValue={defaultDate}
          onChange={onChange}
          disableFuture={true}
        />
      </TestWrapper>
    );

    expect(screen.getByRole('button', { name: /choose date/i })).toBeInTheDocument();
  });

  it('renders with null default value', () => {
    const onChange = vi.fn();

    render(
      <TestWrapper>
        <DateInput
          inputName="dob"
          label="Select Date"
          defaultValue={null}
          onChange={onChange}
          disableFuture={true}
        />
      </TestWrapper>
    );

    expect(screen.getByRole('button', { name: /choose date/i })).toBeInTheDocument();
  });

  it('displays error message when errors are provided', () => {
    const onChange = vi.fn();
    const error = { message: 'Date is required' };

    render(
      <TestWrapper>
        <DateInput
          inputName="dob"
          label="Date"
          defaultValue={null}
          onChange={onChange}
          disableFuture={true}
          errors={[error]}
        />
      </TestWrapper>
    );

    expect(screen.getByText('Date is required')).toBeInTheDocument();
  });

  it('does not display error when errors array is empty', () => {
    const onChange = vi.fn();

    render(
      <TestWrapper>
        <DateInput
          inputName="dob"
          label="Date"
          defaultValue={null}
          onChange={onChange}
          disableFuture={true}
          errors={[]}
        />
      </TestWrapper>
    );

    expect(screen.queryByText('Date is required')).not.toBeInTheDocument();
  });

  it('opens date picker when calendar icon is clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <TestWrapper>
        <DateInput
          inputName="dob"
          label="Date"
          defaultValue={null}
          onChange={onChange}
          disableFuture={true}
        />
      </TestWrapper>
    );

    const openPickerButton = screen.getByRole('button', { name: /choose date/i });
    await user.click(openPickerButton);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('renders with disableFuture true', () => {
    const onChange = vi.fn();

    render(
      <TestWrapper>
        <DateInput
          inputName="dob"
          label="Date"
          defaultValue={null}
          onChange={onChange}
          disableFuture={true}
        />
      </TestWrapper>
    );

    expect(screen.getByRole('button', { name: /choose date/i })).toBeInTheDocument();
  });

  it('renders with disableFuture false', () => {
    const onChange = vi.fn();

    render(
      <TestWrapper>
        <DateInput
          inputName="dob"
          label="Date"
          defaultValue={null}
          onChange={onChange}
          disableFuture={false}
        />
      </TestWrapper>
    );

    expect(screen.getByRole('button', { name: /choose date/i })).toBeInTheDocument();
  });

  it('supports year-only view', () => {
    const onChange = vi.fn();

    render(
      <TestWrapper>
        <DateInput
          inputName="year"
          label="Year"
          defaultValue={null}
          onChange={onChange}
          disableFuture={true}
          view="year"
        />
      </TestWrapper>
    );

    expect(screen.getByRole('button', { name: /choose date/i })).toBeInTheDocument();
  });

  it('supports custom openTo view', () => {
    const onChange = vi.fn();

    render(
      <TestWrapper>
        <DateInput
          inputName="dob"
          label="Date"
          defaultValue={null}
          onChange={onChange}
          disableFuture={true}
          openTo="year"
        />
      </TestWrapper>
    );

    expect(screen.getByRole('button', { name: /choose date/i })).toBeInTheDocument();
  });

  it('handles valid date with isDirty and isValid flags', () => {
    const onChange = vi.fn();
    const validDate = new Date('1990-05-15');

    render(
      <TestWrapper>
        <DateInput
          inputName="dob"
          label="Date"
          defaultValue={validDate}
          onChange={onChange}
          disableFuture={true}
          isDirty={true}
          isValid={true}
        />
      </TestWrapper>
    );

    expect(screen.getByRole('button', { name: /choose date/i })).toBeInTheDocument();
  });

  it('handles invalid date with error', () => {
    const onChange = vi.fn();
    const error = { message: 'Invalid date' };

    render(
      <TestWrapper>
        <DateInput
          inputName="dob"
          label="Date"
          defaultValue={new Date('invalid')}
          onChange={onChange}
          disableFuture={true}
          isDirty={true}
          isValid={false}
          errors={[error]}
        />
      </TestWrapper>
    );

    expect(screen.getByText('Invalid date')).toBeInTheDocument();
  });
});
