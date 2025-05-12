import React from 'react';
import {useForm} from 'react-hook-form';
import { BASE_YEAR, CURRENT_YEAR } from '../../../app/constants';
import { FormContainer } from '../../../components/containers';
import { CenteredGrid, GridItem } from '../../../components/grids';
import ControlledSelectInput from '../../../components/inputs/ControlledSelectInput';
import ControlledSwitchInput from '../../../components/inputs/ControlledSwitchInput';
import ControlledTextInput from '../../../components/inputs/ControlledTextInput';
import { ISelectOptions } from '../../../components/inputs/SelectInput';
import TextList from '../../../components/lists/TextList';
import { DeleteModal } from '../../../components/modals';
import { IListItem, ITrophy } from '../../../types';
import { yearOptions } from '../../../utils/helpers';

interface Props {
  onSubmit: (data: Partial<ITrophy>) => void;
  defaultValues: Partial<ITrophy>;
  seasonOptions: ISelectOptions[];
  onDelete?: () => void;
  deleteLoading?: boolean;
}

const TrophyForm: React.FC<Props> = ({
  onSubmit,
  defaultValues,
  seasonOptions,
  onDelete,
  deleteLoading,
}) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<Partial<ITrophy>>({
    defaultValues,
  });

  const switchComp = (name: keyof ITrophy) => {
    return <ControlledSwitchInput control={control} name={name} />;
  };

  const isFinal = watch('isFinal');

  const switchList: IListItem[] = [
    {
      label: 'Is Winner?',
      value: switchComp('isWinner'),
    },
    {
      label: 'Is a final?',
      value: switchComp('isFinal'),
    },
  ];

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <CenteredGrid dir="row">
        <GridItem xs={12}>
          <ControlledTextInput
            control={control}
            name="name"
            rules={{ required: true, minLength: 2, maxLength: 50 }}
            label="Name"
            errors={errors.name ? [errors.name] : []}
          />
        </GridItem>
        <GridItem xs={12}>
          <ControlledSelectInput
            control={control}
            name="seasonId"
            rules={{ required: true }}
            label="Season"
            options={seasonOptions}
            errors={errors.seasonId ? [errors.seasonId] : []}
          />
        </GridItem>
        <GridItem xs={12}>
          <ControlledSelectInput
            control={control}
            name="year"
            label="Year"
            options={yearOptions(BASE_YEAR, CURRENT_YEAR)}
            errors={errors.year ? [errors.year] : []}
          />
        </GridItem>
        <GridItem>
          <TextList data={switchList} />
        </GridItem>
        {isFinal && (
          <GridItem xs={12}>
            <ControlledTextInput
              control={control}
              name="opponentId"
              label="Opponent"
              errors={errors.opponentId ? [errors.opponentId] : []}
            />
          </GridItem>
        )}
        <GridItem>
          <ControlledTextInput
            control={control}
            name="comment"
            label="Comment"
            errors={errors.comment ? [errors.comment] : []}
            multiline
          />
        </GridItem>
      </CenteredGrid>
      {onDelete && (
        <DeleteModal
          onDelete={onDelete}
          title="Trophy"
          loading={deleteLoading}
        />
      )}
    </FormContainer>
  );
};

export default TrophyForm;
