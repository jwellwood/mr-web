import React from 'react';
import CustomAvatar from '../../../components/avatars/CustomAvatar';
import { SectionContainer } from '../../../components/containers';
import LinksList from '../../../components/lists/LinksList';
import CustomSkeleton from '../../../components/loaders/CustomSkeleton';
import { CustomTypography } from '../../../components/typography';
import { IListItem, ITeamResponse } from '../../../types';
type Props = {
  team?: ITeamResponse;
  loading: boolean;
};

const Organization: React.FC<Props> = ({ team, loading }) => {
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
};

export default Organization;
