import { LinksList, ImageAvatar } from '../../../components';
import { FlagIcon } from '../../../components/icons';
import { CustomTypography, NoDataText } from '../../../components/typography';
import { IMAGE_TYPE } from '../../../constants';
import { FETCH_TEAMS_BY_SEARCH_QUERY } from '../types';

interface Props {
  teams?: FETCH_TEAMS_BY_SEARCH_QUERY['teams'];
  isSearchComplete: boolean;
  loading: boolean;
}

export default function TeamList({ teams, isSearchComplete, loading }: Props) {
  const links = teams?.length
    ? teams?.map(team => {
        return {
          avatar: <ImageAvatar imageUrl={team?.teamBadge?.url} fallbackIcon={IMAGE_TYPE.BADGE} />,
          label: (
            <CustomTypography bold size="sm" color="data">
              {team.teamName}
            </CustomTypography>
          ),
          secondary: (
            <CustomTypography bold size="sm" color="label">
              {team.location} <FlagIcon nationality={team.country || ''} />
            </CustomTypography>
          ),
          link: `/org/${team.orgId._id}/team/${team._id}`,
        };
      })
    : [{ avatar: <></>, label: <></>, secondary: <></> }]; //skeleton item

  return isSearchComplete && !loading && !teams?.length ? (
    <NoDataText>No teams found</NoDataText>
  ) : (
    <LinksList links={links} loading={loading} rows={2} />
  );
}
