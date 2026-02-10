import { useQuery } from '@apollo/client/react';
import { DataError, NoDataText, SectionContainer } from '../../../components';
import LinksList from '../../../components/lists/links-list/LinksList';
import { IListItem } from '../../../components/lists/types';
import { Spinner } from '../../../components/loaders';
import { useCustomParams } from '../../../hooks/useCustomParams';
import { FETCH_ORG_SEASONS } from '../graphql';

export default function OrgSeasons() {
  const { orgId } = useCustomParams();
  const { data, error, loading } = useQuery(FETCH_ORG_SEASONS, { variables: { orgId } });

  const links: IListItem[] =
    data?.orgSeasons.map(season => {
      return {
        label: season.name,
        link: `org_season/${season._id}`,
      };
    }) || [];

  const renderData = data?.orgSeasons.length ? (
    <SectionContainer>
      <LinksList links={links} />
    </SectionContainer>
  ) : (
    <NoDataText>No seasons yet</NoDataText>
  );

  const renderContent = () => {
    return !loading ? renderData : <Spinner />;
  };

  return error ? <DataError error={error} /> : renderContent();
}
