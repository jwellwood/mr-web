import ImageAvatar from '../../../components/avatars/image-avatar/ImageAvatar';
import { SectionContainer } from '../../../components';
import LinksList from '../../../components/lists/links-list/LinksList';
import { IListItem } from '../../../components/lists/types';
import CustomSkeleton from '../../../components/loaders/CustomSkeleton';
import { CustomTypography } from '../../../components/typography';
import { FETCH_TEAM_QUERY } from '../types';
import { IMAGE_TYPE } from '../../../constants';

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
