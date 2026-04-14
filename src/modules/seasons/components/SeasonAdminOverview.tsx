import { useTranslation } from 'react-i18next';
import { CustomTypography, DataError, SectionContainer } from '../../../components';
import { CustomStack } from '../../../components/grids';
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
    <SectionContainer>
      {error ? (
        <DataError error={error} />
      ) : (
        <>
          <CustomStack direction="row" justify="space-between">
            {loading ? (
              <CustomSkeleton width="90px" />
            ) : (
              <CustomTypography bold color="data">
                {season?.name}
              </CustomTypography>
            )}
            {loading ? (
              <CustomSkeleton width="70px" />
            ) : (
              season?.isCurrent && (
                <CustomTypography color="primary">{t('LIST.CURRENT_SEASON')}</CustomTypography>
              )
            )}
          </CustomStack>
          <TextList data={listItems} />
        </>
      )}
    </SectionContainer>
  );
}
