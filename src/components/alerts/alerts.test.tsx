import { render, screen } from '@testing-library/react';
import { form_error_text as errText } from '../../i18n/form-error-text';
import FormErrorMessage from './FormErrorMessage';

describe('Alerts tests', () => {
  const messages = [
    ['required', errText.required],
    ['minLength', errText.short],
    ['maxLength', errText.long],
    ['max', errText.high],
    ['min', errText.low],
    ['pattern', errText.pattern],
    ['validate', errText.validate],
  ];

  messages.forEach(([key, value]) => {
    test(`should render the ${key} error message`, () => {
      const error = { type: key };
      render(<FormErrorMessage error={error} />);
      const alert = screen.getByRole('alert');
      expect(alert).toHaveTextContent(value);
    });
  });
  test('Other error message should render default error message', () => {
    const error = { type: 'other' };
    render(<FormErrorMessage error={error} />);
    const alert = screen.getByRole('alert');
    expect(alert).toHaveTextContent(errText.default);
  });
});
