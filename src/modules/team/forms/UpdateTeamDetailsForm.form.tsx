import React from 'react';
import { useForm } from 'react-hook-form';
import SwitchList from 'components/common/SwitchList';
import { FormContainer } from 'components/containers';
import { CenteredGrid, GridItem } from 'components/grids';
import ControlledColorInput from 'components/inputs/ControlledColorInput';
import ControlledDateInput from 'components/inputs/ControlledDateInput';
import ControlledSelectInput from 'components/inputs/ControlledSelectInput';
import ControlledTextInput from 'components/inputs/ControlledTextInput';
import { IListItem } from 'types';
import { surfaceOptions } from '../constants';
import { ITeamDetailsInput } from '../types';

interface Props {
  onSubmit: (data: Partial<ITeamDetailsInput>) => void;
  defaultValues: Partial<ITeamDetailsInput>;
  countryOptions: any;
}

const UpdateTeamDetailsForm: React.FC<Props> = ({
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
        <GridItem>
          <SwitchList data={switchList} control={control} />
        </GridItem>
        <GridItem xs={12}>
          <ControlledTextInput
            control={control}
            name="teamName"
            label="Team Name"
            rules={{ minLength: 2, maxLength: 50 }}
            errors={errors.teamName}
          />
        </GridItem>
        <GridItem xs={12}>
          <ControlledDateInput
            control={control}
            name="yearFounded"
            label="Year Founded"
            errors={errors.yearFounded}
            view="year"
          />
        </GridItem>
        <GridItem xs={12}>
          <ControlledTextInput
            control={control}
            name="location"
            label="City"
            rules={{ minLength: 2, maxLength: 50 }}
            errors={errors.location}
          />
        </GridItem>
        <GridItem xs={12}>
          <ControlledSelectInput
            control={control}
            name="country"
            label="Country"
            options={countryOptions}
            errors={errors.country}
          />
        </GridItem>
        <GridItem xs={12}>
          <ControlledTextInput
            control={control}
            name="stadiumName"
            label="Stadium Name"
            rules={{ minLength: 2, maxLength: 50 }}
            errors={errors.stadiumName}
          />
        </GridItem>
        <GridItem xs={12}>
          <ControlledTextInput
            control={control}
            name="stadiumLocation"
            label="Stadium Location"
            errors={errors.stadiumLocation}
            multiline
          />
        </GridItem>
        <GridItem xs={12}>
          <ControlledSelectInput
            control={control}
            options={surfaceOptions}
            name="stadiumSurface"
            label="Stadium Surface"
            errors={errors.stadiumSurface}
          />
        </GridItem>
        <GridItem xs={12}>
          <ControlledTextInput
            control={control}
            name="stadiumCapacity"
            rules={{ min: 1, max: 999999, pattern: /^[0-9]*$/ }}
            label="Capacity"
            errors={errors.stadiumCapacity}
          />
        </GridItem>
        <GridItem xs={4}>
          <ControlledColorInput
            control={control}
            name="homeShirt"
            label="Home Shirt"
            errors={errors.homeShirt}
          />
        </GridItem>
        <GridItem xs={4}>
          <ControlledColorInput
            control={control}
            name="homeShorts"
            label="Home Shorts"
            errors={errors.homeShorts}
          />
        </GridItem>
        <GridItem xs={4}>
          <ControlledColorInput
            control={control}
            name="homeSocks"
            label="Home Socks"
            errors={errors.homeSocks}
          />
        </GridItem>
        <GridItem xs={4}>
          <ControlledColorInput
            control={control}
            name="awayShirt"
            label="Away Shirt"
            errors={errors.awayShirt}
          />
        </GridItem>
        <GridItem xs={4}>
          <ControlledColorInput
            control={control}
            name="awayShorts"
            label="Away Shorts"
            errors={errors.awayShorts}
          />
        </GridItem>
        <GridItem xs={4}>
          <ControlledColorInput
            control={control}
            name="awaySocks"
            label="Away Socks"
            errors={errors.awaySocks}
          />
        </GridItem>
        <GridItem xs={4}>
          <ControlledColorInput
            control={control}
            name="kitsBackground"
            label="Kits Background"
            errors={errors.kitsBackground}
          />
        </GridItem>
      </CenteredGrid>
    </FormContainer>
  );
};

export default UpdateTeamDetailsForm;
