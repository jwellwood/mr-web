import React from 'react';
import { IMAGE_TYPE } from 'app/constants';
import CustomAvatar from 'components/avatars/CustomAvatar';
import LinksList from 'components/lists/LinksList';
import { CustomTypography } from 'components/typography';
import { IListItem, ITeamResponse } from 'types';

type Props = {
  teams: ITeamResponse[];
  isSearchComplete: boolean;
};

export const TeamList = ({ teams, isSearchComplete }: Props) => {
  const links: IListItem[] =
    teams?.map((team) => {
      return {
        avatar: (
          <CustomAvatar
            imageUrl={team.teamBadge.url}
            type={IMAGE_TYPE.TEAM}
            isList
          />
        ),
        label: team.teamName,
        link: `/org/${team.orgId._id}/team/${team._id}`,
      };
    }) || [];
  return teams?.length ? (
    <LinksList links={links} />
  ) : (
    isSearchComplete && (
      <CustomTypography color="warning">No teams found</CustomTypography>
    )
  );
};
