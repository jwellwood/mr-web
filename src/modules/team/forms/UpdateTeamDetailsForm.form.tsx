import React from 'react';
import { useForm } from 'react-hook-form';

import { surfaceOptions } from '../constants';
import { ITeamDetailsInput } from '../types';
import { IListItem } from '../../../types';
import { FormContainer } from '../../../components/containers';
import { CenteredGrid, GridItem } from '../../../components/grids';
import SwitchList from '../../../components/common/SwitchList';
import ControlledTextInput from '../../../components/inputs/ControlledTextInput';
import ControlledDateInput from '../../../components/inputs/ControlledDateInput';
import ControlledSelectInput from '../../../components/inputs/ControlledSelectInput';
import ControlledColorInput from '../../../components/inputs/ControlledColorInput.tsx';
import { ISelectOptions } from '../../../components/inputs/SelectInput.tsx';

interface Props {
  onSubmit: (data: Partial<ITeamDetailsInput>) => void;
  defaultValues: Partial<ITeamDetailsInput>;
  countryOptions: ISelectOptions[];
}

const UpdateTeamDetailsForm: React.FC<Props> = ({ onSubmit, defaultValues, countryOptions }) => {
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
        <GridItem size={12}>
          <SwitchList data={switchList} control={control} />
        </GridItem>
        <GridItem size={12}>
          <ControlledTextInput
            control={control}
            name="teamName"
            label="Team Name"
            rules={{ minLength: 2, maxLength: 50 }}
            errors={errors.teamName ? [errors.teamName] : []}
          />
        </GridItem>
        <GridItem size={12}>
          <ControlledDateInput
            control={control}
            name="yearFounded"
            label="Year Founded"
            errors={errors.yearFounded ? [errors.yearFounded] : []}
            view="year"
          />
        </GridItem>
        <GridItem size={12}>
          <ControlledTextInput
            control={control}
            name="location"
            label="City"
            rules={{ minLength: 2, maxLength: 50 }}
            errors={errors.location ? [errors.location] : []}
          />
        </GridItem>
        <GridItem size={12}>
          <ControlledSelectInput
            control={control}
            name="country"
            label="Country"
            options={countryOptions}
            errors={errors.country ? [errors.country] : []}
          />
        </GridItem>
        <GridItem size={12}>
          <ControlledTextInput
            control={control}
            name="stadiumName"
            label="Stadium Name"
            rules={{ minLength: 2, maxLength: 50 }}
            errors={errors.stadiumName ? [errors.stadiumName] : []}
          />
        </GridItem>
        <GridItem size={12}>
          <ControlledTextInput
            control={control}
            name="stadiumLocation"
            label="Stadium Location"
            errors={errors.stadiumLocation ? [errors.stadiumLocation] : []}
            multiline
          />
        </GridItem>
        <GridItem size={12}>
          <ControlledSelectInput
            control={control}
            options={surfaceOptions}
            name="stadiumSurface"
            label="Stadium Surface"
            errors={errors.stadiumSurface ? [errors.stadiumSurface] : []}
          />
        </GridItem>
        <GridItem size={12}>
          <ControlledTextInput
            control={control}
            name="stadiumCapacity"
            rules={{ min: 1, max: 999999, pattern: /^[0-9]*$/ }}
            label="Capacity"
            errors={errors.stadiumCapacity ? [errors.stadiumCapacity] : []}
          />
        </GridItem>
        <GridItem size={4}>
          <ControlledColorInput
            control={control}
            name="homeShirt"
            label="Home Shirt"
            errors={errors.homeShirt ? [errors.homeShirt] : []}
          />
        </GridItem>
        <GridItem size={4}>
          <ControlledColorInput
            control={control}
            name="homeShorts"
            label="Home Shorts"
            errors={errors.homeShorts ? [errors.homeShorts] : []}
          />
        </GridItem>
        <GridItem size={4}>
          <ControlledColorInput
            control={control}
            name="homeSocks"
            label="Home Socks"
            errors={errors.homeSocks ? [errors.homeSocks] : []}
          />
        </GridItem>
        <GridItem size={4}>
          <ControlledColorInput
            control={control}
            name="awayShirt"
            label="Away Shirt"
            errors={errors.awayShirt ? [errors.awayShirt] : []}
          />
        </GridItem>
        <GridItem size={4}>
          <ControlledColorInput
            control={control}
            name="awayShorts"
            label="Away Shorts"
            errors={errors.awayShorts ? [errors.awayShorts] : []}
          />
        </GridItem>
        <GridItem size={4}>
          <ControlledColorInput
            control={control}
            name="awaySocks"
            label="Away Socks"
            errors={errors.awaySocks ? [errors.awaySocks] : []}
          />
        </GridItem>
        <GridItem size={4}>
          <ControlledColorInput
            control={control}
            name="kitsBackground"
            label="Kits Background"
            errors={errors.kitsBackground ? [errors.kitsBackground] : []}
          />
        </GridItem>
      </CenteredGrid>
    </FormContainer>
  );
};

export default UpdateTeamDetailsForm;
