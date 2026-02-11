import { describe, it, expect, vi } from 'vitest';
import { logger } from '../logger';

describe('logger', () => {
  it('calls console methods in development mode', () => {
    const spyError = vi.spyOn(console, 'error').mockImplementation(() => {});
    const spyWarn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const spyLog = vi.spyOn(console, 'log').mockImplementation(() => {});

    // Call logger methods
    logger.error('err msg', new Error('boom'), { foo: 'bar' });
    logger.warn('warn msg', { foo: 'bar' });
    logger.info('info msg', { foo: 'bar' });

    // graphqlError should delegate to error
    logger.graphqlError('QueryX', new Error('gql'), { v: 1 });

    expect(spyError).toHaveBeenCalled();
    expect(spyWarn).toHaveBeenCalled();
    expect(spyLog).toHaveBeenCalled();

    spyError.mockRestore();
    spyWarn.mockRestore();
    spyLog.mockRestore();
  });
});
