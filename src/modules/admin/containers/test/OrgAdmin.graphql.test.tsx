import '@testing-library/jest-dom/vitest';
import { MockedProvider } from '@apollo/client/testing/react';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useCustomParams } from '../../../../hooks/useCustomParams';
import { FETCH_ORG_ADMIN_VIEW } from '../../graphql';
import OrgAdminUsers from '../OrgAdmin';

vi.mock('../../../../hooks/useCustomParams', () => ({
  useCustomParams: vi.fn(),
}));

vi.mock('../../components/OrgAdminView', () => ({
  default: ({
    org,
    loading,
    error,
  }: {
    org?: { orgName?: string };
    loading: boolean;
    error?: Error;
  }) => (
    <div>
      {loading ? <span>Loading</span> : <span>OrgAdminView:{org?.orgName || 'none'}</span>}
      {error && <span>DataError:{error.message}</span>}
    </div>
  ),
}));

const mockedUseCustomParams = vi.mocked(useCustomParams);

describe('OrgAdmin GraphQL integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockedUseCustomParams.mockReturnValue({ orgId: 'org-1' } as never);
  });

  it('passes organization data through after loading', async () => {
    const mocks = [
      {
        request: { query: FETCH_ORG_ADMIN_VIEW, variables: { orgId: 'org-1' } },
        result: {
          data: {
            org: {
              orgName: 'North League',
              orgAdminAccessCode: 'code-1',
              orgAdminAccessEnabled: true,
              adminUsers: [],
            },
          },
        },
        delay: 30,
      },
    ];

    render(
      <MockedProvider mocks={mocks}>
        <OrgAdminUsers />
      </MockedProvider>
    );

    expect(screen.getByText('Loading')).toBeInTheDocument();
    expect(await screen.findByText('OrgAdminView:North League')).toBeInTheDocument();
  });

  it('passes GraphQL errors to the organization view', async () => {
    const mocks = [
      {
        request: { query: FETCH_ORG_ADMIN_VIEW, variables: { orgId: 'org-1' } },
        error: new Error('boom'),
      },
    ];

    render(
      <MockedProvider mocks={mocks}>
        <OrgAdminUsers />
      </MockedProvider>
    );

    expect(await screen.findByText('DataError:boom')).toBeInTheDocument();
  });
});
