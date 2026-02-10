import { useQuery } from '@apollo/client/react';
import { DataError, NoDataText, PageHeader } from '../../../components';
import { IListItem } from '../../../components/lists/types';
import { Spinner } from '../../../components/loaders';
import { LINK_TYPE } from '../../../constants';
import { useAuth } from '../../../hooks';
import { useCustomParams } from '../../../hooks/useCustomParams';
import ResultDetails from '../components/ResultDetails';
import { PAGES } from '../constants';
import { FETCH_RESULT } from '../graphql';

export default function Result() {
  const { orgId, resultId } = useCustomParams();
  const { isOrgAuth } = useAuth('', orgId);

  const links: IListItem[] = [
    {
      label: 'Edit Result',
      type: LINK_TYPE.EDIT,
      link: 'edit',
    },
  ];

  const { data, loading, error } = useQuery(FETCH_RESULT, {
    variables: { resultId: resultId },
  });

  const renderData = data?.result ? (
    <ResultDetails result={data?.result} />
  ) : (
    <NoDataText>No result found</NoDataText>
  );

  const renderContent = () => (loading ? <Spinner /> : renderData);

  return (
    <PageHeader title={PAGES.RESULT} links={isOrgAuth ? links : undefined}>
      {error ? <DataError error={error} /> : renderContent()}
    </PageHeader>
  );
}
