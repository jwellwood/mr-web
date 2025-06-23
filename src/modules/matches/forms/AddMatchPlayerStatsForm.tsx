import React from 'react';
import { useForm } from 'react-hook-form';
import { positionOptions } from '../../../app/constants';
import { FormContainer } from '../../../components/containers';
import { CenteredGrid, GridItem } from '../../../components/grids';
import ControlledSelectInput from '../../../components/inputs/ControlledSelectInput';
import ControlledSwitchInput from '../../../components/inputs/ControlledSwitchInput';
import { ISelectOptions } from '../../../components/inputs/SelectInput';
import TextList from '../../../components/lists/TextList';
import { IListItem, IPlayerInMatch } from '../../../types';
import { getIntegers } from '../../../utils/helpers';
import { theme } from '../../../theme';

interface Props {
  onSubmit: (data: IPlayerInMatch) => void;
  defaultValues: IPlayerInMatch;
  goalOptions: ISelectOptions[];
  concededOptions: ISelectOptions[];
  minuteOptions: ISelectOptions[];
}
const AddMatchPlayerStatsForm: React.FC<Props> = ({
  onSubmit,
  defaultValues,
  goalOptions,
  concededOptions,
  minuteOptions,
}) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm({
    defaultValues,
  });

  const goalsScored = watch('goals');
  const goalsConceded = watch('conceded') as number;

  const starterData: IListItem[] = [
    {
      label: 'Is starter?',
      value: <ControlledSwitchInput control={control} name="isStarter" />,
    },
  ];
  const mvpData: IListItem[] = [
    {
      label: 'Is MVP?',
      value: <ControlledSwitchInput control={control} name="mvp" />,
    },
  ];
  const redCardData: IListItem[] = [
    {
      label: 'Red card?',
      value: <ControlledSwitchInput control={control} name="redCard" />,
    },
  ];

  const cleanSheetData: IListItem[] = [
    {
      label: 'Clean sheet?',
      value: (
        <ControlledSwitchInput
          control={control}
          name="cleanSheet"
          disabled={+goalsConceded !== 0}
        />
      ),
    },
  ];

  return (
    <FormContainer
      onSubmit={handleSubmit(onSubmit)}
      text="Add"
      nonAbsoluteSubmit
      background={theme.palette.dark.main}
    >
      <CenteredGrid dir="row">
        <GridItem size={4}>
          <ControlledSelectInput
            control={control}
            name="minutes"
            label="Minutes"
            options={minuteOptions}
            errors={errors.minutes ? [errors.minutes] : []}
          />
        </GridItem>
        <GridItem size={8}>
          <ControlledSelectInput
            control={control}
            name="matchPosition"
            label="Position"
            options={positionOptions}
            errors={errors.matchPosition ? [errors.matchPosition] : []}
          />
        </GridItem>
        <GridItem size={6}>
          <ControlledSelectInput
            control={control}
            name="goals"
            label="Goals"
            options={goalOptions}
            errors={errors.goals ? [errors.goals] : []}
          />
        </GridItem>
        <GridItem size={6}>
          <ControlledSelectInput
            control={control}
            name="pensScored"
            label="Pens Scored"
            options={goalOptions}
            errors={errors.pensScored ? [errors.pensScored] : []}
            disabled={+goalsScored === 0}
          />
        </GridItem>
        <GridItem size={6}>
          <ControlledSelectInput
            control={control}
            name="assists"
            label="Assists"
            options={goalOptions}
            errors={errors.assists ? [errors.assists] : []}
          />
        </GridItem>
        <GridItem size={6}>
          <ControlledSelectInput
            control={control}
            name="ownGoals"
            label="Own Goals"
            options={concededOptions}
            errors={errors.ownGoals ? [errors.ownGoals] : []}
          />
        </GridItem>
        <GridItem size={6}>
          <ControlledSelectInput
            control={control}
            name="pensMissed"
            label="Pens Missed"
            options={getIntegers(10)}
            errors={errors.pensMissed ? [errors.pensMissed] : []}
          />
        </GridItem>
        <GridItem size={6}>
          <ControlledSelectInput
            control={control}
            name="pensSaved"
            label="Pens Saved"
            options={getIntegers(10)}
            errors={errors.pensSaved ? [errors.pensSaved] : []}
          />
        </GridItem>

        <GridItem size={6}>
          <ControlledSelectInput
            control={control}
            name="conceded"
            label="Conceded"
            options={concededOptions}
            errors={errors.conceded ? [errors.conceded] : []}
          />
        </GridItem>
        <GridItem size={6}>
          <ControlledSelectInput
            control={control}
            name="yellowCards"
            label="Yellow Cards"
            options={getIntegers(2, 0)}
            errors={errors.yellowCards ? [errors.yellowCards] : []}
          />
        </GridItem>
        <GridItem size={12}>
          <TextList data={starterData} />
          <TextList data={cleanSheetData} />
          <TextList data={redCardData} />
          <TextList data={mvpData} />
        </GridItem>
      </CenteredGrid>
    </FormContainer>
  );
};

export default AddMatchPlayerStatsForm;
