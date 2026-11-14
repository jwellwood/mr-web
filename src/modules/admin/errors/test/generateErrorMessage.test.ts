import { CombinedGraphQLErrors } from '@apollo/client/errors';
import { GraphQLError } from 'graphql';
import { describe, expect, it } from 'vitest';
import { generateErrorMessage } from '../generateErrorMessage';

describe('generateErrorMessage', () => {
  it('returns the first GraphQL error code for message translation', () => {
    const error = new CombinedGraphQLErrors({
      errors: [
        new GraphQLError('Invalid code', {
          extensions: { code: 'INVALID_ORG_ADMIN_ACCESS_CODE' },
        }),
      ],
    });

    expect(generateErrorMessage(error, key => key)).toBe('ERRORS.INVALID_ORG_ADMIN_ACCESS_CODE');
  });

  it('uses the generic message for network errors, missing codes and non-string codes', () => {
    const errors: unknown[] = [
      new Error('Network error'),
      new CombinedGraphQLErrors({ errors: [new GraphQLError('Missing code')] }),
      new CombinedGraphQLErrors({
        errors: [new GraphQLError('Invalid code', { extensions: { code: 123 } })],
      }),
    ];

    for (const error of errors) {
      expect(generateErrorMessage(error, key => key)).toBe('ALERTS.REQUEST_ADMIN.ERROR');
    }
  });

  it('uses the generic message for unrecognized codes', () => {
    const error = new CombinedGraphQLErrors({
      errors: [new GraphQLError('Unknown', { extensions: { code: 'UNKNOWN' } })],
    });

    expect(generateErrorMessage(error, key => key)).toBe('ALERTS.REQUEST_ADMIN.ERROR');
  });
});
