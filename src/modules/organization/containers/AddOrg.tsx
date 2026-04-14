import { useMutation } from '@apollo/client/react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useUpdateAuth } from '../../../hooks';
import { AppDispatch, showAlert } from '../../../store';
import { initialOrgDetailsState, type OrganizationFormData } from '../forms/org-form/schema';
import { ADD_ORG } from '../graphql';
import { mapFormToOrg } from '../helpers/mapOrgForm';
import AddOrgPage from '../pages/AddOrgPage';

export default function AddOrg() {
  const { t } = useTranslation('organization');
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { updateAuth } = useUpdateAuth();

  const [addOrg, { loading }] = useMutation(ADD_ORG, {
    onError: err => {
      console.error(err);
      dispatch(showAlert({ text: t('ALERTS.ADD.ERROR'), type: 'error' }));
    },
  });

  const onSubmit = async (data: OrganizationFormData) => {
    try {
      const res = await addOrg({ variables: mapFormToOrg(data) });
      const token = res.data?.org?.token;
      const org = res.data?.org?.org;

      if (token) {
        await updateAuth(token);
      }

      dispatch(showAlert({ text: t('ALERTS.ADD.SUCCESS'), type: 'success' }));
      navigate(`/org/${org?._id}`);
    } catch (error) {
      console.error(error);
      dispatch(showAlert({ text: t('ALERTS.ADD.ERROR'), type: 'error' }));
    }
  };
  return (
    <AddOrgPage onSubmit={onSubmit} loading={loading} defaultValues={initialOrgDetailsState} />
  );
}
