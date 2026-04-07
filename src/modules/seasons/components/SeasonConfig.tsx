import { useTranslation } from 'react-i18next';
import { DataError, SectionContainer } from '../../../components';
import { TextList } from '../../../components/lists';
import { Spinner } from '../../../components/loaders';
import { TApolloError } from '../../../types/apollo';
import UpdateCompConfig from '../forms/competition-configs/UpdateCompConfig';
import { T_FETCH_ORG_SEASON } from '../graphql';

interface Props {
  season?: T_FETCH_ORG_SEASON['orgSeason'];
  loading?: boolean;
  error?: TApolloError;
}

export default function SeasonConfig({ season, loading, error }: Props) {
  const { t } = useTranslation('seasons');
  const renderContent = () => {
    if (loading) return <Spinner />;
    if (error) return <DataError error={error} />;
    return season?.competitionConfigs?.map(config => {
      const compLinks = [
        {
          label: t('CONFIG.ROUNDS'),
          value: config.rounds || '-',
        },
        {
          label: t('CONFIG.RELEGATION'),
          value: config.relegationPositions?.join(', ') ?? '-',
        },
        {
          label: t('CONFIG.PROMOTION'),
          value: config.promotionPositions?.join(', ') ?? '-',
        },
        {
          label: t('CONFIG.SPLIT'),
          value: config.splitIndexes?.join(', ') || '-',
        },
        {
          label: t('CONFIG.PRIORITY'),
          value: config.priority ?? '-',
        },
      ];
      return (
        <SectionContainer
          key={config.competitionId._id}
          title={config.competitionId.name}
          secondaryAction={
            <UpdateCompConfig
              competitionId={config.competitionId._id}
              existingConfig={config}
              numberOfTeams={season.teamIds.length}
              numberOfCompetitions={season.competitionConfigs?.length || 0}
            />
          }
        >
          <TextList data={compLinks} />
        </SectionContainer>
      );
    });
  };

  return renderContent();
}
