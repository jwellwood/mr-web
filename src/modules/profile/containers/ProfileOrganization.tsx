import React from 'react';
import { useQuery } from '@apollo/client';
import { Spinner } from 'components/loaders';
import ErrorGraphql from 'errors/ErrorGraphql';
import OrgList from '../components/OrgList';
import { GET_ORGS_BY_USER_ID } from '../graphql';

const ProfileOrganizations: React.FC = () => {
  const { data, loading, error } = useQuery(GET_ORGS_BY_USER_ID);

  if (error) {
    return <ErrorGraphql error={error} />;
  }
  return loading ? <Spinner /> : <OrgList orgs={data.orgs} />;
};

export default ProfileOrganizations;
