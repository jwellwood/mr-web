import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { NoDataText, PageHeader } from '../../../../components';
import { Spinner } from '../../../../components/loaders';
import { useCustomParams, useNationality, useSeasons } from '../../../../hooks';
import { AppDispatch, showAlert } from '../../../../store';
import { FETCH_SQUAD_LIST_BY_SEASON } from '../../../squad/graphql';
import { PAGES } from '../../constants';
import { ADD_PLAYER } from '../../graphql';
import { mapFormToPlayer } from '../../helpers/mapPlayerForm';
import PlayerForm from './PlayerForm';
import { initialPlayerState } from './state';
import type { PlayerFormData } from './validation';

export default function AddPlayer() {
  const { teamId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { nationalityOptions } = useNationality();
  const { seasonOptions, seasonId, loading } = useSeasons();

  const defaultValues: PlayerFormData = initialPlayerState;

  const [addPlayer, { error, loading: addLoading }] = useMutation(ADD_PLAYER, {
    refetchQueries: [{ query: FETCH_SQUAD_LIST_BY_SEASON, variables: { teamId, seasonId } }],
  });

  const onSubmit = async (formData: PlayerFormData) => {
    try {
      return addPlayer({ variables: { teamId: teamId!, ...mapFormToPlayer(formData) } }).then(
        () => {
          dispatch(showAlert({ text: 'Player added successfully!', type: 'success' }));
          navigate(-1);
        }
      );
    } catch (error) {
      console.error("Couldn't add player: ", error);
      dispatch(showAlert({ text: 'Something went wrong', type: 'error' }));
    }
  };
  const isLoading = loading || addLoading;

  return (
    <PageHeader title={PAGES.ADD_PLAYER}>
      {loading ? (
        <Spinner />
      ) : !seasonOptions.length ? (
        <NoDataText>Please add a season before adding players.</NoDataText>
      ) : (
        <PlayerForm
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          countryOptions={nationalityOptions}
          seasonOptions={seasonOptions}
          loading={isLoading}
          error={error}
        />
      )}
    </PageHeader>
  );
}
