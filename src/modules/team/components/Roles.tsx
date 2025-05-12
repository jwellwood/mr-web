import React from 'react';
import { DataContainer, SectionContainer } from '../../../components/containers';
import { ITeamResponse } from '../../../types';
type Props = {
  team: ITeamResponse;
  loading: boolean;
};

const Roles: React.FC<Props> = ({ team, loading }) => {
  const data =
    team.teamRoles?.map(item => {
      return {
        label: item.role,
        value: item.name,
        id: item.roleId,
      };
    }) || [];

  return (
    <SectionContainer title="Personnel">
      <DataContainer data={data} loading={loading} />
    </SectionContainer>
  );
};

export default Roles;
