import React from 'react';
import { SectionContainer } from 'components/containers';
import { PresentationModal } from 'components/modals';
import { CustomTypography } from 'components/typography';

type Props = { item: any };

const RecordPlayers: React.FC<Props> = ({ item }) => {
  const isMoreThanTwoPlayers = item.names.length > 2;

  const playerList = (player, index) => {
    return (
      <CustomTypography
        key={player.name}
        color="data"
        bold
        link={`player/${player.id}`}
      >
        {player.name}
        {item?.names.length > 1 && index !== item?.names.length - 1 ? (
          <CustomTypography size="xs" bold color="label">
            {' '}
            |{' '}
          </CustomTypography>
        ) : null}
      </CustomTypography>
    );
  };
  const playerListModal = () => {
    return (
      <PresentationModal
        title={`${item.names.length} Players`}
        buttonElement={
          <CustomTypography color="data" bold>
            {item.names.length} players
          </CustomTypography>
        }
      >
        <SectionContainer>
          {item?.names?.map((player, index) => playerList(player, index))}
        </SectionContainer>
      </PresentationModal>
    );
  };

  return isMoreThanTwoPlayers
    ? playerListModal()
    : item?.names?.map((player, index) => playerList(player, index));
};

export default RecordPlayers;
