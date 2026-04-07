import { lazy } from 'react';
import { useTranslation } from 'react-i18next';
import { DataError, PageHeader } from '../../../components';
import { SectionContainer } from '../../../components/containers';
import { Spinner } from '../../../components/loaders';
import { CustomTabs } from '../../../components/tabs';
import { TApolloError } from '../../../types/apollo';
import { T_FETCH_ORG_SEASON } from '../graphql';

const LeagueTables = lazy(() => import('../../results/containers/LeagueTables'));
const Results = lazy(() => import('../../results/containers/Results'));

interface Props {
  data?: T_FETCH_ORG_SEASON;
  loading: boolean;
  error?: TApolloError;
}

export default function OrgSeasonPage({ data, loading, error }: Props) {
  const { t } = useTranslation('seasons');

  const tabs = [
    { label: t('TABS.TABLES'), component: <LeagueTables /> },
    { label: t('TABS.RESULTS'), component: <Results /> },
  ];

  const renderContent = () =>
    loading ? (
      <Spinner />
    ) : (
      <SectionContainer title={data?.orgSeason?.name || t('LABELS.DETAILS')}>
        <CustomTabs type={'orgSeason'} tabs={tabs} level={'secondary'} />
      </SectionContainer>
    );

  return (
    <PageHeader title={t('PAGES.SEASON')}>
      {error ? <DataError error={error} /> : renderContent()}
    </PageHeader>
  );
}
