import React from 'react';
import { SectionContainer } from '../../../components/containers';
import AppIcon from '../../../components/icons/AppIcon';
import TextList from '../../../components/lists/TextList';
import { IListItem, ITeamResponse } from '../../../types';
import DeleteRole from '../containers/DeleteRole';

type Props = {
  team?: ITeamResponse;
};

const RolesList: React.FC<Props> = ({ team }) => {
  const data: IListItem[] =
    team?.teamRoles?.map((item) => {
      return {
        label: item.name,
        secondary: item.role,
        value: (
          <DeleteRole roleId={item.roleId}>
            <AppIcon icon="minus" />
          </DeleteRole>
        ),
        id: item.roleId,
      };
    }) || [];

  return (
    <SectionContainer title="Roles">
      <TextList data={data} />
    </SectionContainer>
  );
};

export default RolesList;
