import { describe, it, expect } from 'vitest';
import { SignUpSchema } from '../schema';

const schema = SignUpSchema();

describe('SignUpSchema', () => {
  const validData = {
    username: 'john',
    email: 'user@example.com',
    password: 'secret123',
    acceptTerms: true,
  };

  it('passes with all valid values', () => {
    expect(schema.safeParse(validData).success).toBe(true);
  });

  it('fails when username is too short', () => {
    const result = schema.safeParse({ ...validData, username: 'a' });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe('The entry is too short (minimum 2)');
  });

  it('fails when username is too long', () => {
    const result = schema.safeParse({ ...validData, username: 'a'.repeat(21) });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe('The entry is too long (maximum 20)');
  });

  it('fails with an invalid email', () => {
    const result = schema.safeParse({ ...validData, email: 'not-an-email' });
    expect(result.success).toBe(false);
  });

  it('fails when password is too short', () => {
    const result = schema.safeParse({ ...validData, password: '12345' });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe('The entry is too short (minimum 6)');
  });

  it('fails when acceptTerms is false', () => {
    const result = schema.safeParse({ ...validData, acceptTerms: false });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe('You must accept the terms of use');
  });
});
