import { DataContainer, SectionContainer } from '../../../components/containers';
import { CenteredGrid, GridItem } from '../../../components/grids';
import AppIcon from '../../../components/icons/AppIcon';
import { PresentationModal } from '../../../components/modals';
import { CustomTypography } from '../../../components/typography';
import { ITeamResponse } from '../types';

interface Props {
  team?: ITeamResponse;
  loading: boolean;
}

export default function Stadium({ team, loading }: Props) {
  const data = [
    {
      label: 'Location',
      value: (
        <PresentationModal
          title="Location"
          buttonElement={<AppIcon icon="location" size="1.1rem" color="white" />}
        >
          {
            <SectionContainer>
              <CenteredGrid dir="row">
                <GridItem size={4}>
                  {team?.stadiumLocation ? (
                    <iframe
                      title="map"
                      src={team?.stadiumLocation}
                      height="250px"
                      style={{ border: 0, width: '100%' }}
                      aria-hidden="false"
                    ></iframe>
                  ) : (
                    <CustomTypography color="warning">No map available yet!</CustomTypography>
                  )}
                </GridItem>
              </CenteredGrid>
            </SectionContainer>
          }
        </PresentationModal>
      ),
    },
    { label: 'Surface', value: team?.stadiumSurface || '-' },
    { label: 'Capacity', value: team?.stadiumCapacity || '-' },
  ];

  return (
    <SectionContainer title="Stadium">
      <div style={{ margin: '10px auto' }}>
        <CustomTypography bold color="data">
          {team?.stadiumName}
        </CustomTypography>
      </div>

      <DataContainer data={data} loading={loading} />
    </SectionContainer>
  );
}
