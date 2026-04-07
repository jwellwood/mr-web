import { useTranslation } from 'react-i18next';
import { DataError, SectionContainer } from '../../../components';
import { TextList } from '../../../components/lists';
import { Spinner } from '../../../components/loaders';
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
      label: t('LIST.NAME'),
      value: season?.name || '-',
    },
    {
      label: t('LIST.START_DATE'),
      value: season?.yearStarted || '-',
    },
    {
      label: t('LIST.END_DATE'),
      value: season?.yearEnded || '-',
    },
    {
      label: t('LIST.CURRENT_SEASON'),
      value: season?.isCurrent ? t('LIST.YES') : t('LIST.NO'),
    },
    {
      label: t('LIST.NUM_TEAMS'),
      value: season?.teamIds.length ?? '-',
    },
    {
      label: t('LIST.NUM_COMPETITIONS'),
      value: season?.competitionConfigs?.length ?? '-',
    },
  ];

  return loading ? (
    <Spinner />
  ) : (
    <SectionContainer>
      {error ? <DataError error={error} /> : <TextList data={listItems} />}
    </SectionContainer>
  );
}
