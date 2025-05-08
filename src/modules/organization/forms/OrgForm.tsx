import React from 'react';
import { useForm } from 'react-hook-form';
import { IOrganization } from '../../../types';
import { FormContainer } from '../../../components/containers';
import { CenteredGrid, GridItem } from '../../../components/grids';
import ControlledTextInput from '../../../components/inputs/ControlledTextInput';
import ControlledDateInput from "../../../components/inputs/ControlledDateInput.tsx";
import ControlledSelectInput
  from "../../../components/inputs/ControlledSelectInput.tsx";
import {ISelectOptions} from "../../../components/inputs/SelectInput.tsx";


interface Props {
  onSubmit: (data: Partial<IOrganization>) => void;
  defaultValues: Partial<IOrganization>;
  countryOptions: ISelectOptions[];
}

const OrgForm: React.FC<Props> = ({
  onSubmit,
  defaultValues,
  countryOptions,
}) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<Partial<IOrganization>>({
    defaultValues,
  });
  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <CenteredGrid dir="row">
        <GridItem xs={12}>
          <ControlledTextInput
            control={control}
            name="name"
            rules={{ required: true, minLength: 2, maxLength: 50 }}
            label="Organization Name"
            errors={errors.name ? [errors.name] : []}
          />
        </GridItem>
        <GridItem xs={12}>
          <ControlledTextInput
            control={control}
            name="website"
            rules={{ required: true, minLength: 2, maxLength: 50 }}
            label="Website"
            errors={errors.name ? [errors.name] : []}
          />
        </GridItem>
        <GridItem xs={12}>
          <ControlledDateInput
            control={control}
            name="yearFounded"
            label="Year Founded"
            view="year"
            errors={errors.yearFounded ? [errors.yearFounded] : []}
          />
        </GridItem>
        <GridItem xs={6}>
          <ControlledTextInput
            control={control}
            name="city"
            rules={{ minLength: 2, maxLength: 50 }}
            label="City"
            errors={errors.city ? [errors.city] : []}
          />
        </GridItem>
        <GridItem xs={6}>
          <ControlledSelectInput
            control={control}
            name="country"
            label="Country"
            options={countryOptions}
            errors={errors.country ? [errors.country] : []}
          />
        </GridItem>
      </CenteredGrid>
    </FormContainer>
  );
};

export default OrgForm;
