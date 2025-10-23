import { useForm } from 'react-hook-form';

import { ITeamDetailsInput } from '../../types';
import { IListItem } from '../../../../types';
import { CenteredGrid, GridItem } from '../../../../components/grids';
import ControlledTextInput from '../../../../components/inputs/ControlledTextInput';
import { ISelectOptions } from '../../../../components/inputs/SelectInput.tsx';
import ControlledSelectInput from '../../../../components/inputs/ControlledSelectInput.tsx';
import { FormContainer } from '../../../../components/containers';
import ControlledDateInput from '../../../../components/inputs/ControlledDateInput.tsx';
import SwitchButtonList from '../../../../components/common/SwitchButtonList.tsx';

interface Props {
  onSubmit: (data: Partial<ITeamDetailsInput>) => void;
  defaultValues: Partial<ITeamDetailsInput>;
  countryOptions: ISelectOptions[];
}

export default function AddTeamForm({ onSubmit, defaultValues, countryOptions }: Props) {
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
          <ControlledTextInput
            control={control}
            name="teamName"
            rules={{ required: true, minLength: 2, maxLength: 50 }}
            label="Team Name"
            errors={errors.teamName ? [errors.teamName] : []}
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
            name="location"
            rules={{ required: true, minLength: 2, maxLength: 50 }}
            label="City"
            errors={errors.location ? [errors.location] : []}
          />
        </GridItem>
        <GridItem size={12}>
          <ControlledSelectInput
            control={control}
            name="country"
            label="Country"
            rules={{ required: true }}
            options={countryOptions}
            errors={errors.country ? [errors.country] : []}
          />
        </GridItem>
        <GridItem size={12}>
          <SwitchButtonList data={switchList} control={control} />
        </GridItem>
      </CenteredGrid>
    </FormContainer>
  );
}
