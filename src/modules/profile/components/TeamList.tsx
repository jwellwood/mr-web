import React from 'react';
import { IMAGE_TYPE } from '../../../app/constants';
import CustomAvatar from '../../../components/avatars/CustomAvatar';
import { SectionContainer } from '../../../components/containers';
import LinksList from '../../../components/lists/LinksList';
import { ITeamResponse } from '../../../types';
type Props = {
  teams?: ITeamResponse[];
};

const TeamList: React.FC<Props> = ({ teams = [] }) => {
  const links = teams.map((team) => {
    const { teamName, teamBadge, _id, orgId } = team;

    return {
      label: teamName,
      link: `/org/${orgId?._id}/team/${_id}`,
      avatar: (
        <CustomAvatar imageUrl={teamBadge?.url} type={IMAGE_TYPE.TEAM} isList />
      ),
    };
  });
  return (
    <SectionContainer title="Teams">
      <LinksList links={links} />
    </SectionContainer>
  );
};

export default TeamList;
