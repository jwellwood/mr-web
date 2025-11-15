import { IMAGE_TYPE } from '../../../app/constants';
import ImageAvatar from '../../../components/avatars/image-avatar/ImageAvatar';
import { SectionContainer } from '../../../components/containers';
import LinksList from '../../../components/lists/LinksList';
import { IListItem } from '../../../components/lists/types';
import { IOrganization } from '../../organization/types';

type Props = {
  orgs?: IOrganization[];
};

export default function OrgList({ orgs = [] }: Props) {
  const links: IListItem[] = orgs.map(org => {
    return {
      label: org.name,
      link: `/org/${org._id}`,
      avatar: (
        <ImageAvatar imageUrl={org.badge.url} alt={org.name} fallbackIcon={IMAGE_TYPE.TEAM} />
      ),
    };
  });
  return (
    <SectionContainer title="Organizations">
      <LinksList links={links} />
    </SectionContainer>
  );
}
