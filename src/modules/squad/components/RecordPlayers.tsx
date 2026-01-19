import { PresentationModal } from '../../../components/modals';
import { CustomTypography } from '../../../components/typography';
import { LinksList, SectionContainer } from '../../../components';

interface Props {
  names: {
    name: string;
    id: string;
  }[];
  loading?: boolean;
}

export default function RecordPlayers({ names, loading }: Props) {
  const isMoreThanOnePlayer = names?.length > 1;

  const playerList = () => (
    <LinksList
      links={names?.map(item => ({
        label: (
          <CustomTypography color="bold" bold>
            {item.name}
          </CustomTypography>
        ),
        link: `player/${item.id}`,
      }))}
      loading={loading}
    />
  );

  const playerLink = (player: { name: string; id: string }) => (
    <CustomTypography key={player.id} color="data" bold link={`player/${player.id}`}>
      {player.name}
    </CustomTypography>
  );

  const playerListModal = () => {
    return (
      <PresentationModal
        title={`${names.length} Players`}
        buttonElement={
          <CustomTypography color="label" bold>
            {names?.length} players
          </CustomTypography>
        }
      >
        <SectionContainer>{playerList()}</SectionContainer>
      </PresentationModal>
    );
  };

  return isMoreThanOnePlayer ? playerListModal() : names?.map(player => playerLink(player));
}
