import React from 'react';
import FlagIcon from 'components/icons/FlagIcon';
import LinksList from 'components/lists/LinksList';
import PositionString from 'components/tables/PositionString';
import { CustomTypography } from 'components/typography';
import { IListItem, IPlayer } from 'types';

interface Props {
  player: IPlayer;
}

const HallOfFamePlayer: React.FC<Props> = ({ player }) => {
  const links: IListItem[] = [
    { label: '-', value: <PositionString>{player.position}</PositionString> },
    {
      label: '-',
      value: (
        <CustomTypography color="data" bold>
          <CustomTypography size="xs" color="label">
            #
          </CustomTypography>
          {player.squadNumber}
        </CustomTypography>
      ),
    },
    {
      label: '-',
      value: <FlagIcon nationality={player.nationality} />,
    },
  ];
  return (
    <LinksList links={[]} />
    // <GridItem xs={6}>
    //   <SectionContainer>
    //     <CenteredGrid dir="row">
    //       <GridItem xs={8}>
    //         <CircularImage size="50px" image={player.image.url} />
    //       </GridItem>
    //       <GridItem xs={4}>
    //         <TextList data={data} />
    //       </GridItem>
    //     </CenteredGrid>
    //     <CustomTypography color="data" bold size="md">
    //       {player.name}
    //     </CustomTypography>
    //   </SectionContainer>
    // </GridItem>
  );
};

export default HallOfFamePlayer;
