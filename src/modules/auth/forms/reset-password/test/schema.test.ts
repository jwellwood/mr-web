import { describe, it, expect } from 'vitest';
import { ResetPasswordSchema } from '../schema';

const schema = ResetPasswordSchema;

describe('ResetPasswordSchema', () => {
  it('passes when both passwords are valid and match', () => {
    expect(schema.safeParse({ password: 'secret123', confirmPassword: 'secret123' }).success).toBe(
      true
    );
  });

  it('fails when password is too short', () => {
    const result = schema.safeParse({ password: '12345', confirmPassword: '12345' });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe('The entry is too short (minimum 6)');
  });

  it('fails when confirmPassword is too short', () => {
    const result = schema.safeParse({ password: 'secret123', confirmPassword: '123' });
    expect(result.success).toBe(false);
  });

  it('fails when passwords do not match', () => {
    const result = schema.safeParse({ password: 'secret123', confirmPassword: 'different1' });
    expect(result.success).toBe(false);
    const noMatchIssue = result.error?.issues.find(i => i.path.includes('confirmPassword'));
    expect(noMatchIssue?.message).toBe('The passwords do not match');
  });
});
