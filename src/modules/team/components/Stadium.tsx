import { useTranslation } from 'react-i18next';
import { DataContainer, SectionContainer } from '../../../components';
import { AppIcon } from '../../../components/icons';
import { PresentationModal } from '../../../components/modals';
import { CustomTypography } from '../../../components/typography';
import { T_FETCH_TEAM_QUERY } from '../graphql';

interface Props {
  team?: T_FETCH_TEAM_QUERY['team'];
  loading: boolean;
}

export default function Stadium({ team, loading }: Props) {
  const { t } = useTranslation('team');
  const data = [
    {
      label: t('SECTIONS.STADIUM.LOCATION'),
      value: (
        <PresentationModal
          title={t('SECTIONS.STADIUM.LOCATION')}
          buttonElement={<AppIcon icon="location" size="1.1rem" color="white" />}
        >
          {
            <SectionContainer>
              {team?.stadiumLocation ? (
                <iframe
                  title="map"
                  src={team?.stadiumLocation}
                  height="250px"
                  style={{ border: 0, width: '100%' }}
                  aria-hidden="false"
                ></iframe>
              ) : (
                <CustomTypography color="warning">{t('SECTIONS.STADIUM.NO_MAP')}</CustomTypography>
              )}
            </SectionContainer>
          }
        </PresentationModal>
      ),
    },
    { label: t('SECTIONS.STADIUM.SURFACE'), value: team?.stadiumSurface || '-' },
    { label: t('SECTIONS.STADIUM.CAPACITY'), value: team?.stadiumCapacity || '-' },
  ];

  return (
    <SectionContainer title={t('SECTIONS.STADIUM.HEADER')}>
      <div style={{ margin: '10px auto' }}>
        <CustomTypography bold color="data">
          {team?.stadiumName}
        </CustomTypography>
      </div>

      <DataContainer data={data} loading={loading} />
    </SectionContainer>
  );
}
