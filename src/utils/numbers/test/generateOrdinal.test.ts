import { describe, expect, test } from 'vitest';
import { generateOrdinal } from '../generateOrdinal';

describe('generate ordinal marker tests', () => {
  test('should return the correct English ordinal marker', () => {
    expect(generateOrdinal(1)).toBe('st');
    expect(generateOrdinal(2)).toBe('nd');
    expect(generateOrdinal(3)).toBe('rd');
    expect(generateOrdinal(4)).toBe('th');
    expect(generateOrdinal(11)).toBe('th');
    expect(generateOrdinal(12)).toBe('th');
    expect(generateOrdinal(13)).toBe('th');
    expect(generateOrdinal(21)).toBe('st');
  });

  test('should return the Spanish ordinal marker for the specified gender', () => {
    expect(generateOrdinal(1, 'es', 'feminine')).toBe('ª');
    expect(generateOrdinal(1, 'es-ES', 'masculine')).toBe('º');
  });
});
