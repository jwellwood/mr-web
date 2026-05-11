import { useTranslation } from 'react-i18next';
import { CustomAvatar, SectionContainer } from '../../../components';
import { CustomStack } from '../../../components/grids';
import { AppIcon } from '../../../components/icons';
import { TextList } from '../../../components/lists';
import { CustomTypography } from '../../../components/typography';
import { T_FETCH_TEAM_QUERY } from '../graphql';

interface Props {
  team?: T_FETCH_TEAM_QUERY['team'];
  loading: boolean;
}

export default function Stadium({ team, loading }: Props) {
  const { t } = useTranslation('team');

  const getMapsUrl = (address: string) =>
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  const data = [
    {
      label: t('SECTIONS.STADIUM.CAPACITY'),
      value: team?.stadiumCapacity || '-',
    },
    {
      label: t('SECTIONS.STADIUM.SURFACE'),
      value: team?.stadiumSurface || '-',
    },
  ];

  return (
    <SectionContainer title={t('SECTIONS.STADIUM.HEADER')}>
      <SectionContainer>
        <CustomStack direction="row" align="center" justify="space-between">
          <div>
            <CustomTypography color="data" size="md" bold>
              {team?.stadiumName}
            </CustomTypography>
            <div></div>
            <CustomTypography color="label" size="sm" bold>
              {team?.location}
            </CustomTypography>
          </div>
          {team?.stadiumLocation && (
            <CustomAvatar>
              <a
                href={getMapsUrl(team?.stadiumLocation || '')}
                target="_blank"
                rel="noopener noreferrer"
              >
                <AppIcon icon="location" size="1.5rem" color="primary" />
              </a>
            </CustomAvatar>
          )}
        </CustomStack>
      </SectionContainer>
      <TextList data={data} loading={loading} />
    </SectionContainer>
  );
}
