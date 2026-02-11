import { DataError, ImageAvatar, SectionContainer } from '../../../components';
import { LinksList, type IListItem } from '../../../components/lists';
import { IMAGE_TYPE } from '../../../constants';
import { TApolloError } from '../../../types/apollo';
import { FETCH_ORGS_BY_USER_QUERY } from '../types';

interface Props {
  loading: boolean;
  data?: FETCH_ORGS_BY_USER_QUERY;
  error?: TApolloError;
}

export default function ProfileOrgsView({ data, loading, error }: Props) {
  const { orgs } = data || {};

  const links: IListItem[] = orgs
    ? orgs?.map(org => {
        return {
          label: org.name,
          link: `/org/${org._id}`,
          avatar: (
            <ImageAvatar imageUrl={org.badge.url} alt={org.name} fallbackIcon={IMAGE_TYPE.BADGE} />
          ),
        };
      })
    : [];

  return (
    <>
      {error ? (
        <DataError error={error} />
      ) : (
        <SectionContainer title="Organizations">
          <LinksList links={links} loading={loading} />
        </SectionContainer>
      )}
    </>
  );
}
