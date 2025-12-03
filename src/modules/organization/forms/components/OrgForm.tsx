import { useForm } from 'react-hook-form';

import { FormContainer } from '../../../../components/containers';
import { CenteredGrid, GridItem } from '../../../../components/grids';
import ControlledTextInput from '../../../../components/inputs/ControlledTextInput';
import ControlledDateInput from '../../../../components/inputs/ControlledDateInput.tsx';
import { ISelectOptions } from '../../../../components/inputs/SelectInput.tsx';
import ControlledSelectInput from '../../../../components/inputs/ControlledSelectInput.tsx';
import { IOrganizationInput } from '../../types.ts';

interface Props {
  onSubmit: (data: IOrganizationInput) => void;
  defaultValues: IOrganizationInput;
  countryOptions: ISelectOptions[];
}

export default function OrgForm({ onSubmit, defaultValues, countryOptions }: Props) {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<IOrganizationInput>({
    defaultValues,
  });
  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <CenteredGrid dir="row">
        <GridItem size={12}>
          <ControlledTextInput
            control={control}
            name="name"
            rules={{ required: true, minLength: 2, maxLength: 50 }}
            label="Organization Name"
            errors={errors.name ? [errors.name] : []}
          />
        </GridItem>
        <GridItem size={12}>
          <ControlledTextInput
            control={control}
            name="website"
            rules={{ required: true, minLength: 2, maxLength: 50 }}
            label="Website"
            errors={errors.website ? [errors.website] : []}
          />
        </GridItem>
        <GridItem size={12}>
          <ControlledDateInput
            control={control}
            name="yearFounded"
            label="Year Founded"
            view="year"
            errors={errors.yearFounded ? [errors.yearFounded] : []}
          />
        </GridItem>
        <GridItem size={12}>
          <ControlledTextInput
            control={control}
            name="city"
            rules={{ minLength: 2, maxLength: 50 }}
            label="City"
            errors={errors.city ? [errors.city] : []}
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
      </CenteredGrid>
    </FormContainer>
  );
}
