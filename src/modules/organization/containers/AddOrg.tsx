import { useMutation } from '@apollo/client/react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, showAlert } from '../../../store';
import { FETCH_ORGS_BY_USER, FETCH_USER } from '../../profile/graphql';
import { initialOrgDetailsState, type OrganizationFormData } from '../forms/org-form/schema';
import { ADD_ORG } from '../graphql';
import { mapFormToOrg } from '../helpers/mapOrgForm';
import AddOrgPage from '../pages/AddOrgPage';

export default function AddOrg() {
  const { t } = useTranslation('organization');
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const [addOrg, { loading }] = useMutation(ADD_ORG, {
    refetchQueries: [{ query: FETCH_USER }, { query: FETCH_ORGS_BY_USER }],
    onError: err => {
      console.error(err);
      dispatch(showAlert({ text: t('ALERTS.ADD.ERROR'), type: 'error' }));
    },
  });

  const onSubmit = async (data: OrganizationFormData) => {
    try {
      return addOrg({ variables: mapFormToOrg(data) }).then(res => {
        dispatch(showAlert({ text: t('ALERTS.ADD.SUCCESS'), type: 'success' }));
        navigate(`/org/${res?.data?.org._id}`);
      });
    } catch (error) {
      console.error(error);
      dispatch(showAlert({ text: t('ALERTS.ADD.ERROR'), type: 'error' }));
    }
  };
  return (
    <AddOrgPage onSubmit={onSubmit} loading={loading} defaultValues={initialOrgDetailsState} />
  );
}
