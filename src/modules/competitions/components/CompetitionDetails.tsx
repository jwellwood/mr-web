import { useTranslation } from 'react-i18next';
import { SectionContainer } from '../../../components';
import { TextList, type IListItem } from '../../../components/lists';
import { CustomTypography } from '../../../components/typography';
import { T_FETCH_COMPETITION } from '../graphql';

interface Props {
  competition?: T_FETCH_COMPETITION['competition'];
}

export default function CompetitionDetails({ competition }: Props) {
  const { t } = useTranslation('competitions');
  if (!competition) {
    return (
      <CustomTypography size="md" color="label">
        {t('NO_DATA.COMPETITION_DATA')}
      </CustomTypography>
    );
  }
  const data: IListItem[] = [
    {
      label: t('LIST.NAME'),
      value: competition?.name,
    },
    {
      label: t('LIST.TYPE'),
      value: competition?.competitionType,
    },
    {
      label: t('LIST.ACTIVE'),
      value: competition?.isActive ? t('LIST.YES') : t('LIST.NO'),
    },
    {
      label: t('LIST.PLAYERS_PER_TEAM'),
      value: competition?.playersPerTeam || '-',
    },
    {
      label: t('LIST.MATCH_LENGTH'),
      value: competition?.matchMinutes || '-',
    },
  ];

  return (
    <SectionContainer title={t('SECTIONS.SUMMARY')}>
      <TextList data={data} />
    </SectionContainer>
  );
}
