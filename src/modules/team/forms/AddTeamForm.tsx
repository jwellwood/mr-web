import React from 'react';
import { useForm } from 'react-hook-form';
import SwitchList from 'components/common/SwitchList';
import { FormContainer } from 'components/containers';
import { CenteredGrid, GridItem } from 'components/grids';
import ControlledDateInput from 'components/inputs/ControlledDateInput';
import ControlledSelectInput from 'components/inputs/ControlledSelectInput';
import ControlledTextInput from 'components/inputs/ControlledTextInput';
import { IListItem } from 'types';
import { ITeamDetailsInput } from '../types';

interface Props {
  onSubmit: (data: Partial<ITeamDetailsInput>) => void;
  defaultValues: Partial<ITeamDetailsInput>;
  countryOptions: any;
}

const AddTeamForm: React.FC<Props> = ({
  onSubmit,
  defaultValues,
  countryOptions,
}) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<Partial<ITeamDetailsInput>>({
    defaultValues,
  });

  const switchList: IListItem[] = [
    {
      label: 'Is currently active?',
      value: 'isActive',
    },
  ];

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <CenteredGrid dir="row">
        <GridItem xs={12}>
          <ControlledTextInput
            control={control}
            name="teamName"
            rules={{ required: true, minLength: 2, maxLength: 50 }}
            label="Team Name"
            errors={errors.teamName}
          />
        </GridItem>
        <GridItem xs={12}>
          <ControlledDateInput
            control={control}
            name="yearFounded"
            label="Year Founded"
            view="year"
            errors={errors.yearFounded}
          />
        </GridItem>
        <GridItem xs={6}>
          <ControlledTextInput
            control={control}
            name="location"
            rules={{ required: true, minLength: 2, maxLength: 50 }}
            label="City"
            errors={errors.location}
          />
        </GridItem>
        <GridItem xs={6}>
          <ControlledSelectInput
            control={control}
            name="country"
            label="Country"
            rules={{ required: true }}
            options={countryOptions}
            errors={errors.country}
          />
        </GridItem>
        <GridItem>
          <SwitchList data={switchList} control={control} />
        </GridItem>
      </CenteredGrid>
    </FormContainer>
  );
};

export default AddTeamForm;
