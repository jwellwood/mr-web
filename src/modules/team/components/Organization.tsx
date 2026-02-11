import { ImageAvatar } from '../../../components/avatars';
import { SectionContainer } from '../../../components/containers';
import { LinksList, type IListItem } from '../../../components/lists';
import CustomSkeleton from '../../../components/loaders/custom-skeleton/CustomSkeleton';
import { CustomTypography } from '../../../components/typography';
import { IMAGE_TYPE } from '../../../constants';
import { FETCH_TEAM_QUERY } from '../types';

interface Props {
  team?: FETCH_TEAM_QUERY['team'];
  loading: boolean;
}

export default function Organization({ team, loading }: Props) {
  const { orgId } = team || {};
  const links: IListItem[] = [
    {
      avatar: (
        <ImageAvatar imageUrl={orgId?.badge?.url} fallbackIcon={IMAGE_TYPE.BADGE} size="40px" />
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
      <LinksList links={links} loading={loading} />
    </SectionContainer>
  );
}
