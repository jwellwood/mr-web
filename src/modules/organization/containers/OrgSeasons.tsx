import { useQuery } from '@apollo/client';

import { FETCH_ORG_SEASONS } from '../graphql';
import ErrorGraphql from '../../../errors/ErrorGraphql';
import { useCustomParams } from '../../../hooks/useCustomParams';
import { Spinner } from '../../../components/loaders';
import LinksList from '../../../components/lists/LinksList.tsx';
import { IListItem } from '../../../components/lists/types.ts';
import { NoDataText, SectionContainer } from '../../../components';

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

  return error ? <ErrorGraphql error={error} /> : renderContent();
}
