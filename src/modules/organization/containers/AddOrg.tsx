import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { PAGES, initialOrgDetailsState } from '../constants';
import OrgForm from '../forms/OrgForm';
import { ADD_ORG } from '../graphql';
import {AppDispatch} from "../../../store/store.ts";
import { useNationality } from '../../../hooks';
import { IOrganization } from '../../../types';
import { GET_USER } from '../../profile/graphql/getUser.graphql.ts';
import {showAlert} from "../../../store/features/alerts/alertsSlice.ts";
import ErrorGraphql from "../../../errors/ErrorGraphql.tsx";
import RouteGuard from "../../../router/RouteGuard.tsx";
import {AuthRoles} from "../../../constants.ts";
import PageHeader from '../../../components/typography/PageHeader.tsx';
import {Spinner} from "../../../components/loaders";

const AddOrg: React.FC = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { nationalityOptions } = useNationality();

  const [defaultValues, setDefaultValues] =
    useState<Partial<IOrganization>>({});

  const [addOrg, { error, loading }] = useMutation(ADD_ORG, {
    refetchQueries: [{ query: GET_USER }],
  });

  useEffect(() => {
    setDefaultValues({ ...initialOrgDetailsState });
  }, []);

  const onSubmit = async (data: Partial<IOrganization>) => {
    try {
      return addOrg({ variables: { ...data } }).then((res) => {
        dispatch(showAlert({text: 'Organization added successfully!', type: 'success'}))
        navigate(`/org/${res?.data?.org._id}`);
      });
    } catch (error) {
      console.error(error);
      dispatch(showAlert({text: 'Something went wrong', type: 'error'}))
    }
  };

  if (error) return <ErrorGraphql error={[error.message]} />;

  return (
    <RouteGuard authorization={AuthRoles.USER}>
      <PageHeader title={PAGES.ADD} />
      {!loading && defaultValues ? (
        <OrgForm
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          countryOptions={nationalityOptions}
        />
      ) : (
        <Spinner />
      )}
    </RouteGuard>
  );
};

export default AddOrg;
