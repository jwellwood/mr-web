import CustomAvatar from '../../../components/avatars/CustomAvatar';
import { SectionContainer } from '../../../components/containers';
import LinksList from '../../../components/lists/LinksList';
import CustomSkeleton from '../../../components/loaders/CustomSkeleton';
import { CustomTypography } from '../../../components/typography';
import { IListItem } from '../../../types';
import { ITeamResponse } from '../types';

interface Props {
  team?: ITeamResponse;
  loading: boolean;
}

export default function Organization({ team, loading }: Props) {
  const { orgId } = team || {};
  const links: IListItem[] = [
    {
      avatar: loading ? (
        <CustomAvatar>
          <CustomSkeleton variant="circular" height="40px" width="40px" />
        </CustomAvatar>
      ) : (
        <CustomAvatar imageUrl={orgId?.badge?.url} />
      ),
      label: (
        <CustomTypography color="data">
          {loading ? <CustomSkeleton /> : orgId?.name}
        </CustomTypography>
      ),
      link: `/org/${orgId?._id}`,
    },
  ];

  return (
    <SectionContainer title="Organization">
      <LinksList links={links} />
    </SectionContainer>
  );
}
