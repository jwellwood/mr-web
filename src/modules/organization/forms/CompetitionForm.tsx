import React from 'react';
import { useForm } from 'react-hook-form';
import SwitchList from 'components/common/SwitchList';
import { FormContainer } from 'components/containers';
import { CenteredGrid, GridItem } from 'components/grids';
import ControlledSelectInput from 'components/inputs/ControlledSelectInput';
import ControlledTextInput from 'components/inputs/ControlledTextInput';
import { getMinutesOptions } from 'modules/matches/helpers';
import { ICompetition, IListItem } from 'types';
import { getIntegers } from 'utils/helpers';
import { competitionOptions } from '../constants';

interface Props {
  onSubmit: (data: Partial<ICompetition>) => void;
  defaultValues: Partial<ICompetition>;
}

const CompetitionForm: React.FC<Props> = ({ onSubmit, defaultValues }) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<Partial<ICompetition>>({
    defaultValues,
  });

  const switchList: IListItem[] = [
    {
      label: 'Is competition active?',
      value: 'isActive',
    },
  ];
  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <CenteredGrid dir="row">
        <GridItem xs={12}>
          <ControlledTextInput
            control={control}
            name="name"
            label="Competition Name"
            rules={{ required: true, minLength: 2, maxLength: 50 }}
            errors={errors.name}
          />
        </GridItem>
        <GridItem xs={12}>
          <ControlledSelectInput
            control={control}
            name="competitionType"
            label="Competition Type"
            options={competitionOptions}
            errors={errors.competitionType}
          />
        </GridItem>
        <GridItem xs={12}>
          <ControlledSelectInput
            control={control}
            name="playersPerTeam"
            label="Players Per Team"
            options={getIntegers(15)}
            errors={errors.playersPerTeam}
          />
        </GridItem>
        <GridItem xs={12}>
          <ControlledSelectInput
            control={control}
            name="matchMinutes"
            label="Minutes Per Match"
            options={getMinutesOptions(120)}
            errors={errors.matchMinutes}
          />
        </GridItem>
        <GridItem xs={12}>
          <ControlledSelectInput
            control={control}
            name="numberOfTeams"
            label="Number of Teams"
            options={getIntegers(50)}
            errors={errors.numberOfTeams}
          />
        </GridItem>
      </CenteredGrid>
      <SwitchList data={switchList} control={control} />
    </FormContainer>
  );
};

export default CompetitionForm;
