import { lazy } from 'react';
import { useTranslation } from 'react-i18next';
import { PageContainer } from '../../../components';
import { useAuth } from '../../../hooks';
import { TApolloError } from '../../../types/apollo';
import { T_FETCH_USER_QUERY } from '../graphql';
import { getProfileAdminLinks } from '../helpers/getProfileAdminLinks';

const ProfileView = lazy(() => import('../components/ProfileView'));
const ProfileOrganizations = lazy(() => import('../containers/ProfileOrganization'));
const ProfileTeams = lazy(() => import('../containers/ProfileTeams'));

interface Props {
  data?: T_FETCH_USER_QUERY;
  loading: boolean;
  error?: TApolloError;
}

export default function ProfilePage({ data, loading, error }: Props) {
  const { t } = useTranslation('profile');
  const { isAuth } = useAuth();

  return (
    <PageContainer title={t('PAGES.PROFILE')} links={isAuth ? getProfileAdminLinks(t) : undefined}>
      <>
        <ProfileView data={data} loading={loading} error={error} />
        <ProfileOrganizations />
        <ProfileTeams />
      </>
    </PageContainer>
  );
}
