import { useTranslation } from 'react-i18next';
import { DataError, NoDataText, SectionContainer } from '../../../components';
import { TApolloError } from '../../../types/apollo';
import { T_FETCH_SEASONS_POSITION } from '../graphql';
import SeasonAccordionItem from './SeasonAccordionItem';

interface Props {
  data?: T_FETCH_SEASONS_POSITION;
  loading: boolean;
  error?: TApolloError;
}

export default function SeasonsView({ data, loading, error }: Props) {
  const { t } = useTranslation('teamseasons');

  const renderContent = () => {
    if (data?.position && data.position.length === 0) {
      return <NoDataText>{t('NO_DATA.SEASONS')}</NoDataText>;
    }

    const seasons = loading || !data?.position?.length ? new Array(15).fill({}) : data.position;

    return seasons.map((season, index) => {
      const { seasonId, name, division, position, totalFinalPositions } =
        season as T_FETCH_SEASONS_POSITION['position'] extends Array<infer U> ? U : never;

      return (
        <SeasonAccordionItem
          key={seasonId || index}
          seasonId={seasonId ?? ''}
          name={name ?? undefined}
          division={division ?? undefined}
          position={position ?? undefined}
          totalFinalPositions={totalFinalPositions ?? undefined}
          loading={loading}
        />
      );
    });
  };
  return (
    <SectionContainer>{error ? <DataError error={error} /> : renderContent()}</SectionContainer>
  );
}
