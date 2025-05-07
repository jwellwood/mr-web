import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormContainer } from 'components/containers';
import { CenteredGrid, GridItem } from 'components/grids';
import ControlledMultiSelectInput from 'components/inputs/ControlledMultiSelectInput';
import { ISelectOptions } from 'components/inputs/SelectInput';
import TextList from 'components/lists/TextList';
import { CustomTypography } from 'components/typography';
import { IPlayer } from 'types';

interface Props {
  onSubmit: (data: { matchPlayers: string[] }) => void;
  defaultValues: { matchPlayers: string[] };
  playersOptions: ISelectOptions[];
  players: IPlayer[];
}
const AddMatchPlayersForm: React.FC<Props> = ({
  onSubmit,
  defaultValues,
  playersOptions,
  players,
}) => {
  const [playerList, setPlayerList] = useState([]);
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm({
    defaultValues,
  });

  const matchPlayers = watch('matchPlayers');

  useEffect(() => {
    const list = [];
    matchPlayers.forEach((player) => {
      const selectedPlayer = players.find(
        (p) => p._id === (player as unknown as string)
      );
      list.push({ label: selectedPlayer?.name });
    });
    setPlayerList(list);
  }, [matchPlayers, players]);

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)} text="Next">
      <CenteredGrid dir="row">
        <GridItem>
          <ControlledMultiSelectInput
            control={control}
            name="matchPlayers"
            label="Players"
            options={playersOptions}
            errors={errors.matchPlayers}
          />
        </GridItem>
        <GridItem>
          {playerList.length ? (
            <TextList data={playerList} />
          ) : (
            <CustomTypography color="label">Add some players</CustomTypography>
          )}
        </GridItem>
      </CenteredGrid>
    </FormContainer>
  );
};

export default AddMatchPlayersForm;
