import { IMAGE_TYPE } from '../../../app/constants';
import CustomAvatar from '../../../components/avatars/CustomAvatar';
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
      avatar: <CustomAvatar imageUrl={org.badge.url} alt={org.name} type={IMAGE_TYPE.ORG} />,
    };
  });
  return (
    <SectionContainer title="Organizations">
      <LinksList links={links} />
    </SectionContainer>
  );
}
