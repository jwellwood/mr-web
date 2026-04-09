import { describe, it, expect } from 'vitest';
import { backendToFrontend, frontendToBackend } from '../mappers';
import type { EditProfileFormData } from '../schema';

const baseUser = {
  _id: 'user-1',
  username: 'jdoe',
  email: 'jdoe@example.com',
  dateOfBirth: '1990-06-15T00:00:00.000Z',
  nationality: 'GB',
  image: { url: 'https://example.com/img.png', public_id: 'img-1' },
  teamIds: [],
  orgIds: [],
  createdAt: '2020-01-01',
  updatedAt: '2021-01-01',
} as unknown as Parameters<typeof backendToFrontend>[0];

describe('backendToFrontend', () => {
  it('maps string dateOfBirth to a Date', () => {
    const result = backendToFrontend(baseUser);
    expect(result.dateOfBirth).toBeInstanceOf(Date);
    expect((result.dateOfBirth as Date).toISOString()).toBe('1990-06-15T00:00:00.000Z');
  });

  it('maps username and email directly', () => {
    const result = backendToFrontend(baseUser);
    expect(result.username).toBe('jdoe');
    expect(result.email).toBe('jdoe@example.com');
  });

  it('maps nationality', () => {
    const result = backendToFrontend(baseUser);
    expect(result.nationality).toBe('GB');
  });

  it('maps null dateOfBirth to undefined', () => {
    const user = { ...baseUser, dateOfBirth: null };
    const result = backendToFrontend(user as never);
    expect(result.dateOfBirth).toBeUndefined();
  });

  it('maps null nationality to undefined', () => {
    const user = { ...baseUser, nationality: null };
    const result = backendToFrontend(user as never);
    expect(result.nationality).toBeUndefined();
  });
});

describe('frontendToBackend', () => {
  const base: EditProfileFormData = {
    username: 'jdoe',
    email: 'jdoe@example.com',
    dateOfBirth: new Date('1990-06-15T00:00:00.000Z'),
    nationality: 'GB',
  };

  it('maps username and email directly', () => {
    const result = frontendToBackend(base);
    expect(result.username).toBe('jdoe');
    expect(result.email).toBe('jdoe@example.com');
  });

  it('converts dateOfBirth Date to ISO string', () => {
    const result = frontendToBackend(base);
    expect(result.dateOfBirth).toBe('1990-06-15T00:00:00.000Z');
  });

  it('passes nationality string through', () => {
    const result = frontendToBackend(base);
    expect(result.nationality).toBe('GB');
  });

  it('converts empty string nationality to null', () => {
    const result = frontendToBackend({ ...base, nationality: '' });
    expect(result.nationality).toBeNull();
  });

  it('omits dateOfBirth when undefined', () => {
    const result = frontendToBackend({ ...base, dateOfBirth: undefined });
    expect(result.dateOfBirth).toBeUndefined();
  });

  it('omits dateOfBirth when invalid Date', () => {
    const result = frontendToBackend({ ...base, dateOfBirth: new Date('not-a-date') });
    expect(result.dateOfBirth).toBeUndefined();
  });

  it('omits nationality when not provided', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { nationality: _, ...noNat } = base;
    const result = frontendToBackend(noNat as EditProfileFormData);
    expect(result.nationality).toBeUndefined();
  });
});
