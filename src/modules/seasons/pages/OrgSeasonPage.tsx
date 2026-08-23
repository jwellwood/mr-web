import { lazy } from 'react';
import { useTranslation } from 'react-i18next';
import { DataError, PageHeader } from '../../../components';
import { SectionContainer } from '../../../components/containers';
import { Spinner } from '../../../components/loaders';
import { TApolloError } from '../../../types/apollo';
import { T_FETCH_ORG_SEASON } from '../graphql';

const Competitions = lazy(() => import('../../results/containers/Competitions'));

interface Props {
  data?: T_FETCH_ORG_SEASON;
  loading: boolean;
  error?: TApolloError;
}

export default function OrgSeasonPage({ data, loading, error }: Props) {
  const { t } = useTranslation('seasons');

  const renderContent = () =>
    loading ? (
      <Spinner />
    ) : (
      <SectionContainer title={data?.orgSeason?.name || t('LABELS.DETAILS')}>
        <Competitions />
      </SectionContainer>
    );

  return (
    <PageHeader title={t('PAGES.SEASON')}>
      {error ? <DataError error={error} /> : renderContent()}
    </PageHeader>
  );
}
