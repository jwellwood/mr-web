import { IMAGE_TYPE } from '../../../app/constants';
import CustomAvatar from '../../../components/avatars/CustomAvatar';
import FlagIcon from '../../../components/icons/FlagIcon';
import LinksList from '../../../components/lists/LinksList';
import { CustomTypography } from '../../../components/typography';
import { IListItem, ITeamResponse } from '../../../types';
type Props = {
  teams: ITeamResponse[];
  isSearchComplete: boolean;
};

export const TeamList = ({ teams, isSearchComplete }: Props) => {
  const links: IListItem[] =
    teams?.map(team => {
      return {
        avatar: <CustomAvatar imageUrl={team?.teamBadge?.url} type={IMAGE_TYPE.TEAM} isList />,
        label: (
          <CustomTypography bold size="sm" color="data">
            {team.teamName}
          </CustomTypography>
        ),
        secondary: (
          <CustomTypography bold size="sm" color="label">
            {team.location} <FlagIcon nationality={team.country} />
          </CustomTypography>
        ),
        link: `/org/${team.orgId._id}/team/${team._id}`,
      };
    }) || [];
  return teams?.length ? (
    <LinksList links={links} />
  ) : (
    isSearchComplete && <CustomTypography color="warning">No teams found</CustomTypography>
  );
};
