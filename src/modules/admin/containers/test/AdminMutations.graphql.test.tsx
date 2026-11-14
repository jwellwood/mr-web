import '@testing-library/jest-dom/vitest';
import { useQuery } from '@apollo/client/react';
import { MockedProvider } from '@apollo/client/testing/react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useSelector } from 'react-redux';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useCustomParams } from '../../../../hooks';
import { clearAlert, store } from '../../../../store';
import type { RootState } from '../../../../store/store';
import TestWrapper from '../../../../utils/test-helpers/TestWrapper';
import {
  FETCH_ORG_ADMIN_VIEW,
  SET_ORG_ADMIN_ACCESS_CODE,
  SET_TEAM_ADMIN_ACCESS_CODE,
  TOGGLE_ORG_ADMIN_ACCESS,
} from '../../graphql';
import GenerateAdminCode from '../GenerateAdminCode';
import SetAdminAccessCode from '../SetAdminAccessCode';
import ToggleAdminAccessEnabled from '../ToggleAdminAccessEnabled';

vi.mock('@apollo/client/react', async importOriginal => importOriginal());

vi.mock('../../../../hooks', () => ({
  useCustomParams: vi.fn(),
}));

const mockedUseCustomParams = vi.mocked(useCustomParams);

function CurrentAlert() {
  const text = useSelector((state: RootState) => state.alertsReducer.text);
  return <output>{text}</output>;
}

function OrgAdminQueryProbe() {
  const { data } = useQuery(FETCH_ORG_ADMIN_VIEW, { variables: { orgId: 'org-1' } });
  return <output>{data?.org?.orgName || 'Loading organization'}</output>;
}

describe('admin mutation containers', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    store.dispatch(clearAlert());
    mockedUseCustomParams.mockReturnValue({ orgId: 'org-1', teamId: 'team-1' } as never);
  });

  it('generates an organization access code', async () => {
    const user = userEvent.setup();
    const mocks = [
      {
        request: { query: SET_ORG_ADMIN_ACCESS_CODE, variables: { orgId: 'org-1' } },
        result: { data: { SET_ORG_ADMIN_ACCESS_CODE: { _id: 'org-1' } } },
      },
    ];

    render(
      <MockedProvider mocks={mocks}>
        <TestWrapper>
          <>
            <CurrentAlert />
            <GenerateAdminCode />
          </>
        </TestWrapper>
      </MockedProvider>
    );

    await user.click(screen.getByRole('button', { name: 'Generate Admin Code' }));

    expect(await screen.findByText('Admin access code generated successfully')).toBeInTheDocument();
  });

  it('sets the team access code with the entered value', async () => {
    const user = userEvent.setup();
    const mocks = [
      {
        request: {
          query: SET_TEAM_ADMIN_ACCESS_CODE,
          variables: { teamId: 'team-1', code: 'secret-code' },
        },
        result: { data: { SET_TEAM_ADMIN_ACCESS_CODE: { _id: 'team-1' } } },
      },
    ];

    render(
      <MockedProvider mocks={mocks}>
        <TestWrapper>
          <>
            <CurrentAlert />
            <SetAdminAccessCode />
          </>
        </TestWrapper>
      </MockedProvider>
    );

    await user.click(screen.getByRole('button', { name: 'Set Admin Access Code' }));
    await user.type(document.getElementById('accessCode') as HTMLInputElement, 'secret-code');
    await user.click(screen.getByRole('button', { name: /submit/i }));

    expect(await screen.findByText('Admin access code set successfully')).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('sends the new enabled value and refetches the organization admin view', async () => {
    const user = userEvent.setup();
    const mocks = [
      {
        request: { query: FETCH_ORG_ADMIN_VIEW, variables: { orgId: 'org-1' } },
        result: {
          data: {
            org: {
              orgName: 'Before toggle',
              orgAdminAccessCode: 'code-1',
              orgAdminAccessEnabled: false,
              adminUsers: [],
            },
          },
        },
      },
      {
        request: {
          query: TOGGLE_ORG_ADMIN_ACCESS,
          variables: { orgId: 'org-1', enabled: true },
        },
        result: { data: { TOGGLE_ORG_ADMIN_ACCESS: { _id: 'org-1' } } },
      },
      {
        request: { query: FETCH_ORG_ADMIN_VIEW, variables: { orgId: 'org-1' } },
        result: {
          data: {
            org: {
              orgName: 'After toggle',
              orgAdminAccessCode: 'code-1',
              orgAdminAccessEnabled: true,
              adminUsers: [],
            },
          },
        },
      },
    ];

    render(
      <MockedProvider mocks={mocks}>
        <TestWrapper>
          <>
            <CurrentAlert />
            <OrgAdminQueryProbe />
            <ToggleAdminAccessEnabled data={{ enabled: false }} />
          </>
        </TestWrapper>
      </MockedProvider>
    );

    expect(await screen.findByText('Before toggle')).toBeInTheDocument();
    await user.click(screen.getByRole('switch'));

    expect(await screen.findByText('Admin access updated successfully!')).toBeInTheDocument();
    expect(await screen.findByText('After toggle')).toBeInTheDocument();
  });
});
