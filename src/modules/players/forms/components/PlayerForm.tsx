import React from 'react';
import { useForm } from 'react-hook-form';
import { positionOptions } from '../../../../constants';
import { FormContainer } from '../../../../components/containers';
import { CenteredGrid, GridItem } from '../../../../components/grids';
import ControlledDateInput from '../../../../components/inputs/ControlledDateInput';
import ControlledMultiSelectInput from '../../../../components/inputs/ControlledMultiSelectInput';
import ControlledSelectInput from '../../../../components/inputs/ControlledSelectInput';
import ControlledTextInput from '../../../../components/inputs/ControlledTextInput';
import { ISelectOptions } from '../../../../components/inputs/SelectInput';
import { getIntegers } from '../../../../utils/helpers';
import SwitchButtonList from '../../../../components/forms/SwitchButtonList';
import { IPlayer } from '../../types';
import { IListItem } from '../../../../components/lists/types';

interface Props {
  onSubmit: (data: Partial<IPlayer>) => void;
  defaultValues: Partial<IPlayer>;
  countryOptions: ISelectOptions[];
  seasonOptions: ISelectOptions[];
}

const PlayerForm: React.FC<Props> = ({
  onSubmit,
  defaultValues,
  countryOptions,
  seasonOptions,
}) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<Partial<IPlayer>>({
    defaultValues,
  });

  const seasonIds = watch('seasonIds');
  const disabled = (seasonIds?.length || 0) < 1;

  const switchList: IListItem[] = [
    {
      label: 'Is player team captain?',
      value: 'isCaptain',
    },
    {
      label: 'Is player team vice captain?',
      value: 'isViceCaptain',
    },
    {
      label: 'Is player in the hall of fame?',
      value: 'isHallOfFame',
    },
  ];

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)} disabled={disabled}>
      <CenteredGrid dir="row">
        <GridItem size={12}>
          <ControlledTextInput
            control={control}
            name="name"
            rules={{ required: true, minLength: 2, maxLength: 50 }}
            label="Name"
            errors={errors.name ? [errors.name] : []}
          />
        </GridItem>
        <GridItem size={12}>
          <ControlledSelectInput
            control={control}
            name="nationality"
            label="Nationality"
            options={countryOptions}
            errors={errors.nationality ? [errors.nationality] : []}
          />
        </GridItem>
        <GridItem size={12}>
          <ControlledDateInput
            control={control}
            name="dateOfBirth"
            label="Date of Birth"
            openTo="year"
            errors={errors.dateOfBirth ? [errors.dateOfBirth] : []}
          />
        </GridItem>
        <GridItem size={12}>
          <ControlledDateInput
            control={control}
            name="yearJoined"
            label="Year Joined"
            view="year"
            errors={errors.yearJoined ? [errors.yearJoined] : []}
          />
        </GridItem>
        <GridItem size={12}>
          <ControlledSelectInput
            control={control}
            name="position"
            label="Position"
            options={positionOptions}
            errors={errors.position ? [errors.position] : []}
          />
        </GridItem>
        <GridItem size={12}>
          <ControlledSelectInput
            control={control}
            name="squadNumber"
            label="Squad Number"
            options={getIntegers(99)}
            errors={errors.squadNumber ? [errors.squadNumber] : []}
          />
        </GridItem>
        <GridItem size={12}>
          <ControlledMultiSelectInput
            control={control}
            name="seasonIds"
            rules={{ required: true }}
            options={seasonOptions}
            label="Seasons Played"
            errors={
              errors.seasonIds
                ? [
                    {
                      name: 'seasonIds',
                      message:
                        (Array.isArray(errors.seasonIds)
                          ? errors.seasonIds[0]?.message
                          : errors.seasonIds?.message) || 'This field is required',
                    },
                  ]
                : []
            }
          />
        </GridItem>
        <GridItem size={12}>
          <SwitchButtonList control={control} data={switchList} />
        </GridItem>
      </CenteredGrid>
    </FormContainer>
  );
};

export default PlayerForm;
