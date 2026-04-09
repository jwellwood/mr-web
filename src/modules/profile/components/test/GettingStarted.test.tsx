import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import TestWrapper from '../../../../utils/test-helpers/TestWrapper';
import GettingStarted from '../GettingStarted';

vi.mock('../../router', () => ({
  PROFILE_PATHS: {
    PROFILE: '/profile',
    EDIT: 'edit',
    EDIT_IMAGE: 'edit_image',
    CHANGE_PASSWORD: 'change_password',
  },
}));

const completeProfile = {
  username: 'jdoe',
  dateOfBirth: '1990-06-15',
  nationality: 'GB',
  image: { url: 'https://example.com/img.png' },
  teamIds: ['team-1'],
  orgIds: ['org-1'],
} as unknown as Parameters<typeof GettingStarted>[0]['profile'];

describe('GettingStarted', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('renders nothing when all steps are complete', () => {
    const { container } = render(
      <MemoryRouter>
        <TestWrapper>
          <GettingStarted profile={completeProfile} />
        </TestWrapper>
      </MemoryRouter>
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('renders nothing when already dismissed', () => {
    localStorage.setItem('getting_started_dismissed', 'true');
    const { container } = render(
      <MemoryRouter>
        <TestWrapper>
          <GettingStarted profile={undefined} />
        </TestWrapper>
      </MemoryRouter>
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('renders the getting started section when steps remain', () => {
    render(
      <MemoryRouter>
        <TestWrapper>
          <GettingStarted profile={undefined} />
        </TestWrapper>
      </MemoryRouter>
    );
    expect(screen.getByText('Getting Started')).toBeInTheDocument();
  });

  it('shows the complete-profile step when username/dob/nationality are missing', () => {
    render(
      <MemoryRouter>
        <TestWrapper>
          <GettingStarted profile={undefined} />
        </TestWrapper>
      </MemoryRouter>
    );
    expect(screen.getByText('Complete your profile')).toBeInTheDocument();
  });

  it('shows the upload-photo step when image url is default', () => {
    const profile = {
      ...completeProfile,
      image: { url: 'default' },
      teamIds: ['t1'],
      orgIds: ['o1'],
    } as unknown as Parameters<typeof GettingStarted>[0]['profile'];
    render(
      <MemoryRouter>
        <TestWrapper>
          <GettingStarted profile={profile} />
        </TestWrapper>
      </MemoryRouter>
    );
    expect(screen.getByText('Upload a profile photo')).toBeInTheDocument();
  });

  it('shows the join-team step when no teams or orgs', () => {
    const profile = {
      ...completeProfile,
      teamIds: [],
      orgIds: [],
    } as unknown as Parameters<typeof GettingStarted>[0]['profile'];
    render(
      <MemoryRouter>
        <TestWrapper>
          <GettingStarted profile={profile} />
        </TestWrapper>
      </MemoryRouter>
    );
    expect(screen.getByText('Create or join a team or organization')).toBeInTheDocument();
  });

  it('dismisses on clicking the cross icon and sets localStorage', async () => {
    render(
      <MemoryRouter>
        <TestWrapper>
          <GettingStarted profile={undefined} />
        </TestWrapper>
      </MemoryRouter>
    );
    expect(screen.getByText('Getting Started')).toBeInTheDocument();

    const user = userEvent.setup();
    // The dismiss AppIcon is a <span> in the section header's secondaryAction slot.
    // Navigate from the title text up to the header row, then click the secondary-action span.
    const titleEl = screen.getByText('Getting Started');
    const headerRow = titleEl.closest('div');
    const dismissSpan = headerRow?.querySelector('span > span'); // outer <span> wraps AppIcon <span>
    expect(dismissSpan).not.toBeNull();
    await user.click(dismissSpan!);

    await waitFor(() => {
      expect(localStorage.getItem('getting_started_dismissed')).toBe('true');
    });
  });
});
