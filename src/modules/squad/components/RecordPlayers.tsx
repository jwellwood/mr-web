import { PresentationModal } from '../../../components/modals';
import { CustomTypography } from '../../../components/typography';
import { SectionContainer } from '../../../components';

interface Props {
  item: {
    names: {
      name: string;
      id: string;
    }[];
  };
}

export default function RecordPlayers({ item }: Props) {
  const isMoreThanTwoPlayers = item.names.length > 2;

  const playerList = (
    player: {
      id: string;
      name: string;
    },
    index: number
  ) => {
    return (
      <CustomTypography key={player.name} color="data" bold link={`player/${player.id}`}>
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
}
