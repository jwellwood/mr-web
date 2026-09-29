import { lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { SectionContainer } from '../../../components';
import { Spinner } from '../../../components/loaders';

const Awards = lazy(() => import('../../awards/containers/Awards'));

interface Props {
  seasonId: string;
  loading?: boolean;
}

export default function SeasonAwards({ seasonId, loading }: Props) {
  const { t } = useTranslation('teamseasons');

  return (
    <SectionContainer title={t('TABS.AWARDS')}>
      {loading ? (
        <Spinner />
      ) : (
        <Suspense fallback={<Spinner />}>
          <Awards season_id={seasonId} />
        </Suspense>
      )}
    </SectionContainer>
  );
}
