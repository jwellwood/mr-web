import { ApolloError } from '@apollo/client';
import { DataError, ImageAvatar, SectionContainer } from '../../../components';
import LinksList from '../../../components/lists/links-list/LinksList';
import { IListItem } from '../../../components/lists/types';
import { IMAGE_TYPE } from '../../../constants';
import { FETCH_ORGS_BY_USER_QUERY } from '../types';

interface Props {
  loading: boolean;
  data?: FETCH_ORGS_BY_USER_QUERY;
  error?: ApolloError;
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
