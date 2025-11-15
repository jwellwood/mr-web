import { IMAGE_TYPE } from '../../../app/constants';
import ImageAvatar from '../../../components/avatars/image-avatar/ImageAvatar';
import FlagIcon from '../../../components/icons/FlagIcon';
import LinksList from '../../../components/lists/LinksList';
import { IListItem } from '../../../components/lists/types';
import { CustomTypography } from '../../../components/typography';
import { ITeamResponse } from '../../team/types';

type Props = {
  teams: ITeamResponse[];
  isSearchComplete: boolean;
};

export default function TeamList({ teams, isSearchComplete }: Props) {
  const links: IListItem[] =
    teams?.map(team => {
      return {
        avatar: <ImageAvatar imageUrl={team?.teamBadge?.url} fallbackIcon={IMAGE_TYPE.TEAM} />,
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
}
