import { useForm } from 'react-hook-form';

import { FormContainer } from '../../../../components/containers';
import { CenteredGrid, GridItem } from '../../../../components/grids';
import ControlledSelectInput from '../../../../components/inputs/ControlledSelectInput';
import ControlledTextInput from '../../../../components/inputs/ControlledTextInput';
import { getMinutesOptions } from '../../../matches/helpers';
import { competitionOptions } from '../../constants';
import { getIntegers } from '../../../../utils/helpers';
import SwitchButtonList from '../../../../components/forms/SwitchButtonList';
import { ICompetitionInput } from '../../types';
import { IListItem } from '../../../../components/lists/types';

interface Props {
  onSubmit: (data: ICompetitionInput) => void;
  defaultValues: ICompetitionInput;
}

export default function CompetitionForm({ onSubmit, defaultValues }: Props) {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ICompetitionInput>({
    defaultValues,
  });

  const switchList: IListItem[] = [
    {
      label: 'Currently active?',
      value: 'isActive',
    },
  ];

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <CenteredGrid dir="row">
        <GridItem size={12}>
          <ControlledTextInput
            control={control}
            name="name"
            label="Competition Name"
            rules={{ required: true, minLength: 2, maxLength: 50 }}
            errors={errors.name ? [errors.name] : []}
          />
        </GridItem>
        <GridItem size={12}>
          <ControlledSelectInput
            control={control}
            name="competitionType"
            label="Competition Type"
            options={competitionOptions}
            errors={errors.competitionType ? [errors.competitionType] : []}
          />
        </GridItem>
        <GridItem size={12}>
          <ControlledSelectInput
            control={control}
            name="playersPerTeam"
            label="Players Per Team"
            options={getIntegers(15)}
            errors={errors.playersPerTeam ? [errors.playersPerTeam] : []}
          />
        </GridItem>
        <GridItem size={12}>
          <ControlledSelectInput
            control={control}
            name="matchMinutes"
            label="Minutes Per Match"
            options={getMinutesOptions(120)}
            errors={errors.matchMinutes ? [errors.matchMinutes] : []}
          />
        </GridItem>
        <GridItem size={12}>
          <ControlledSelectInput
            control={control}
            name="numberOfTeams"
            label="Number of Teams"
            options={getIntegers(50)}
            errors={errors.numberOfTeams ? [errors.numberOfTeams] : []}
          />
        </GridItem>
        <GridItem size={12}>
          <SwitchButtonList data={switchList} control={control} />
        </GridItem>
      </CenteredGrid>
    </FormContainer>
  );
}
