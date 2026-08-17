import { useTranslation } from 'react-i18next';
import { CustomTypography, DataError, SectionContainer } from '../../../components';
import { TextList } from '../../../components/lists';
import { CustomSkeleton } from '../../../components/loaders';
import { TApolloError } from '../../../types/apollo';
import { T_FETCH_ORG_SEASON } from '../graphql';

interface Props {
  season?: T_FETCH_ORG_SEASON['orgSeason'];
  loading?: boolean;
  error?: TApolloError;
}

export default function SeasonAdminOverview({ season, loading, error }: Props) {
  const { t } = useTranslation('seasons');

  const listItems = [
    {
      label: t('LIST.NUM_TEAMS'),
      value: loading ? <CustomSkeleton width="70px" /> : (season?.teamIds.length ?? '-'),
    },
    {
      label: t('LIST.NUM_COMPETITIONS'),
      value: loading ? (
        <CustomSkeleton width="70px" />
      ) : (
        (season?.competitionConfigs?.length ?? '-')
      ),
    },
  ];

  return (
    <SectionContainer
      title={loading ? <CustomSkeleton width="90px" /> : season?.name}
      subtitle={
        loading ? (
          <CustomSkeleton width="70px" />
        ) : (
          <CustomTypography bold color={season?.isCurrent ? 'primary' : 'label'}>
            {t(season?.isCurrent ? 'LIST.CURRENT_SEASON' : 'LIST.PAST_SEASON')}
          </CustomTypography>
        )
      }
    >
      {error ? (
        <DataError error={error} />
      ) : (
        <>
          <TextList data={listItems} />
        </>
      )}
    </SectionContainer>
  );
}
